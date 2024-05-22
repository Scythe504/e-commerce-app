"use client"
import React, { useEffect, useState } from "react"
import { getAllItems } from "@/actions/seed"
import { ProductCard } from "@/components/item-lists/main-card";
import { addToCart } from "@/actions/add-to-cart";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

type Item = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  cartId: string;
}


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
    {items.map((item, index) => {
      return <ProductCard key={item.id}
       title={item.title} 
      description={item.description} 
      handleClick={()=>handleClick({item})}
      />
    })}
  </div>
}