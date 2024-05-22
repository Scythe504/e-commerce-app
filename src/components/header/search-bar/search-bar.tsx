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

export const SearchBar = () => {
    const [searchParam, setSeachParam] = useState('');
    const debouncedValue = useDebounce({
        value: searchParam,
        delay: 500,
    });
    const [presentItems, setPresentItems] = useState<Item[]>([]);
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const fetchData = useEffect(() => {
        searchItems(debouncedValue).then((e) => {
            //@ts-ignore
            setPresentItems([...e?.success])
            console.log("e:", { e })
            return e;
        }).catch(e => console.log(e))
    }, [debouncedValue])
    useEffect(() => {
        fetchData;
    }, [debouncedValue])

    return <div className="w-full">
        <div className="flex flex-row w-full">
            <div className="w-full">
                <Input placeholder="Search Anything"
                    onChange={(e) => setSeachParam(e.target.value)}
                    className="w-full"
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
