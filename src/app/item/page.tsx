"use client"
import React, { useEffect, useState } from "react"
import { getAllItems } from "@/actions/getItem"
import { ProductCard } from "@/components/items/main-card";
import { addToCart } from "@/actions/add-to-cart";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Item, Review } from "@prisma/client";
import { getAllReviews } from "@/actions/review";


interface RatingInfo {
  avgRating: number;
  totalRating: number;
}


export default function Items() {
  const [items, setItems] = useState<Item[]>([]);
  const [success, setSuccess] = useState<string | undefined>('');
  const [error, setError] = useState<string | undefined>('');
  const [sumRating, setSumRating] = useState<Record<string, RatingInfo>>({
    "": {
      avgRating: 0,
      totalRating: 0
    }
  });
  const { toast } = useToast();

  useEffect(() => {
    getAllItems().then((e) => {
      //@ts-ignore
      if(e?.length === 0) {
        toast({
          description : "No items found"
        })
      } else if (e !== undefined) {
        setItems([...e])
      } else {
        toast({
          description : "No items Found"
        })
      }
    }).catch(e =>{
      console.error({e})
      toast({
        description : "Some error occurred"
      })
    })
  }, [])

  const handleClick = async ({ item }: {
    item: Item
  }) => {
    const addStatus = await addToCart({
      item
    });
    if (addStatus?.success) {
      setSuccess(addStatus.success);
      toast({
        description: success
      })
    } else {
      setError(addStatus?.error);
      toast({
        description: error
      })
    }
  }

  //map the id with the review array
  useEffect(() => {
    getAllReviews().then((resolve) => {
      const items = resolve.success;
      let hashMap: Record<string, Review[]> = {};
      items?.forEach((item) => {
        hashMap[item.id] = item.review
        let sum = 0;
        let length = item.review.length
        hashMap[item.id].forEach(review => {
          sum += review.rating
        })
        setSumRating((prevState) => ({
          ...prevState
          , [item.id]: {
            avgRating: sum / length,
            totalRating: length
          }
        }))
      })
    }).catch(e => {
      console.error({ e });
    })
  }, [])

  return <div className="h-full w-full">
    {items.map((item) => {
      return <Link
        key={item.id}
        href={`/item/${item.id}`}
        target={"_self"}
      >
        <ProductCard
          title={item.title}
          description={item.description || ""}
          handleClick={() => handleClick({ item })}
          imageUrl={item.image}
          rating={(!isNaN(sumRating[item.id]?.avgRating)) ? Number(sumRating[item.id]?.avgRating.toFixed(1)) : 0}
          totalReviews={(sumRating[item.id]?.totalRating)} />
      </Link>
    })}
  </div>
}