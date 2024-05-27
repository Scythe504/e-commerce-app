"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { searchItems } from "@/actions/search";
import { Item } from "@prisma/client";
import { Modal } from "@/components/modal/skeleton";
import { getAllItems } from "@/actions/getItem";
import { toast } from "@/components/ui/use-toast";
import { SearchList } from "@/components/items/search-list";

export const SearchBar = () => {
    const [searchParam, setSeachParam] = useState('');
    const [showResults, setResults] = useState(false)
    const [items, setItems] = useState<Item[]>([])
    const debouncedValue = useDebounce({
        value: searchParam,
        delay: 500,
    });
    const [presentItems, setPresentItems] = useState<Item[]>([]);
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        getAllItems().then(data => {
            if (data !== undefined) {
                setItems([...data])
            } else {
                throw new Error("No items found")
            }
        }).catch(e => {
            console.error(e);
            toast({
                description: "No items present to search for"
            })
        })
    }, [])
    useEffect(() => {
        searchItems(items, debouncedValue).then((e) => {
            if (!e?.success) {
                throw new Error("No items to search for")
            }
            setPresentItems([...e.success])
        }).catch((e) => {
            console.error(e),
                setPresentItems([])
        })
    }, [debouncedValue])

    return <div className="w-full">
        <div className="flex flex-row w-full">
            <div className="w-full">
                <Input placeholder="Search Anything"
                    onChange={(e) => setSeachParam(e.target.value)}
                    className="w-full hidden md:block"
                    onFocus={() => setIsInputFocused(!isInputFocused)}
                    ref={searchInputRef}
                />
                {isInputFocused && debouncedValue.length > 0 && (
                    <Modal
                        isFocus={isInputFocused}
                    >
                        <div className="hidden md:block md:opacity-100 opacity-0">
                            <div className="absolute w-full top-full h-fit z-30 flex flex-col">
                                {presentItems.map((item, index) => {
                                    if (index > 6) return;
                                    return <SearchList key={item.id} id={item.id} title={item.title} />
                                }
                                )}
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
            <div>
                <div>
                    <Button
                        variant="ghost"
                        onClick={() => setResults(!showResults)}
                    >
                        <Search size={24} />
                    </Button>
                </div>
                {
                    showResults && (
                        <div className=" flex flex-col items-end md:hidden md:opacity-0 w-full">
                            <div
                                className="absolute w-[220px] top-16 h-fit z-30 md:hidden lg:hidden"
                            >
                                <Input placeholder="Search Anything"
                                    onChange={(e) => setSeachParam(e.target.value)}
                                    onFocus={() => setIsInputFocused(!isInputFocused)}
                                    ref={searchInputRef}
                                />
                                
                                    <div className="relative w-full h-fit z-30 flex flex-col">
                                        {presentItems.map((item, index) => {
                                            if (index > 6) return;
                                            return <SearchList key={item.id} id={item.id} title={item.title} />
                                        }
                                        )}
                                    </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    </div>
}
