"use client"
import { ProductStruct } from "@/components/items/product-struct";
import { usePathname } from "next/navigation"

export default function () {
    const pathName = usePathname();
    return (
        <ProductStruct id={`${pathName.slice(6, pathName.length)}`} />
    )
    
}