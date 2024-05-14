"use client"
import { useEffect, useState } from "react"
import { getAllItems } from "@/actions/seed"
import ProductCard from "@/components/item-lists/item-card";

type Item = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  cartId: string;
}


export default function Items() {
  const [items, setItems] = useState<Item[]>([])
  useEffect(() => {
     getAllItems().then((e) => {
      //@ts-ignore
      setItems(prevItems => [...prevItems, ...e])
      console.log("e:",{e})
      return e;
    }).catch(e=> console.log(e))
  }, [])
  console.log("items:",{items});
  return <div className="text-center h-full w-full">
   
      {items.map((item, index)=><ProductCard key={index} title={item.title} description={item.description}/>)}
  </div>
}