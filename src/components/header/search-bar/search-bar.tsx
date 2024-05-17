"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { ValidItems } from "./show-valid-items";
import { useDebounce } from "@/hooks/useDebounce";
import { searchItems } from "@/actions/search";
import { Item } from "@prisma/client";
import { motion } from "framer-motion";

export const SearchBar = () => {
    const [regex, setRegex] = useState('');
    const debouncedValue = useDebounce({
        value: regex,
        delay: 500,
    });
    const [presentItems, setPresentItems] = useState<Item[]>([]);
    useEffect(() => {
        searchItems(debouncedValue).then((e) => {
            //@ts-ignore
            setPresentItems([...e?.success])
            console.log("e:", { e })
            return e;
        }).catch(e => console.log(e))
    }, [debouncedValue])

    return <div className="w-full">
        <div className="flex flex-row w-full">
            <div className="w-full">
                <Input placeholder="Search Anything" onChange={(e) => setRegex(e.target.value)} className="w-full" />
                {debouncedValue&& <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                className="flex items-center justify-center relative h-fit">
                    <ValidItems presentItems={presentItems} />
                </motion.div>}
            </div>
            <Button variant="ghost">
                <Search size={24} />
            </Button>
        </div>
    </div>
}
