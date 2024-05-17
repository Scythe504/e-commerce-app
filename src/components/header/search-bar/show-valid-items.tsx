"use client"
import { searchItems } from "@/actions/search"
import ProductCard from "@/components/item-lists/item-card"
import { SearchList } from "@/components/item-lists/list-card"
import { Item } from "@prisma/client"
import { useEffect, useState } from "react"

export const ValidItems = ({presentItems}: {
    presentItems : Item[]
})=> {
    console.log({presentItems});
    return <div className="absolute w-full top-full h-fit z-30 flex flex-col">
        {presentItems.map((item, index)=>{
            if(index>6) return ;
            return <SearchList key={item.id} title={item.title}/>
        }
    )}
    </div>
}