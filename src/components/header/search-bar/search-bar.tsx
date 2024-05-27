"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ValidItems } from "./show-valid-items";
import { useDebounce } from "@/hooks/useDebounce";
import { searchItems } from "@/actions/search";
import { Item } from "@prisma/client";
import { Modal } from "@/components/modal/skeleton";
import { getAllItems } from "@/actions/getItem";

export const SearchBar = () => {
    const [searchParam, setSeachParam] = useState('');
    const [items, setItems] = useState<Item[]>([])
    const debouncedValue = useDebounce({
        value: searchParam,
        delay: 500,
    });
    const [presentItems, setPresentItems] = useState<Item[]>([]);
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    useEffect(()=> {
        getAllItems().then(data=> {
            setItems([...data!])
        })
    },[])
    useEffect(() => {
        searchItems(items, debouncedValue).then((e) => {
            //@ts-ignore
            setPresentItems([...e?.success])
            return e;
        }).catch(e => console.error(e))
    }, [debouncedValue])

    return <div className="w-full">
        <div className="flex flex-row w-full">
            <div className="w-full">
                <Input placeholder="Search Anything"
                    onChange={(e) => setSeachParam(e.target.value)}
                    className="w-full hidden md:block"
                    onFocus={() => setIsInputFocused(true)}
                    ref={searchInputRef}
                />
                {isInputFocused && debouncedValue.length > 0 && (
                    <Modal
                        isFocus={isInputFocused}
                    >
                        <ValidItems presentItems={presentItems} />
                    </Modal>
                )}
            </div>
            <Button variant="ghost">
                <Search size={24} />
            </Button>
        </div>
    </div>
}
