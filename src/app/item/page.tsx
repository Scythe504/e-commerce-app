"use client"
import React, { useEffect, useState } from "react"
import { getAllItems } from "@/actions/seed"
import { ProductCard } from "@/components/items/main-card";
import { addToCart } from "@/actions/add-to-cart";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Item } from "@prisma/client";


export default function Items() {
  const [items, setItems] = useState<Item[]>([]);
  const [success, setSuccess] = useState<string | undefined>('');
  const [error, setError] = useState<string | undefined>('');
  const { toast } = useToast();
  
  useEffect(() => {
    getAllItems().then((e) => {
      //@ts-ignore
      setItems(prevItems => [...prevItems, ...e])
      console.log("e:", { e })
      return e;
    }).catch(e => console.log(e))
  }, [])
  console.log("items:", { items });
  
  const handleClick = async ({item}: {
    item : Item
  }) => {
    const addStatus = await addToCart({
      item
    });
    if (addStatus?.success) {
      setSuccess(addStatus.success);
      toast({
        description : success
      })
    } else {
      setError(addStatus?.error);
      toast({
        description : error
      })
    }
  }
  

  return <div className="text-center h-full w-full">
    {items.map((item) => {
      return <Link 
        key={item.id}
        href={`/item/${item.id}`}
        target={"_self"}
      >
      <ProductCard 
       title={item.title} 
      description={item.description} 
      handleClick={()=>handleClick({item})}
      />
      </Link>
    })}
  </div>
}