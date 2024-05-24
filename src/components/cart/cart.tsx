"use client"
import { useCallback, useEffect, useState } from "react"
import { CartFooter } from "./cart-footer/cart-footer"
import { CartItems } from "./cart-items/cart-item"
import { useToast } from "@/components/ui/use-toast"
import { Item } from "@prisma/client"
import { getCartItems } from "@/actions/getItem"


export const MainCart = () => {

    const { toast } = useToast();
    const [error, setError] = useState<string | undefined>("");
    const [cartItems, setCartItems] = useState<Item[]>([]);
    const [totalPrice, setPrice] = useState(0);
    // TODO - implement a removeItemFromCartActions later on
    const handleRemove = () => {
        toast({
            description: "Item has been removed"
        })
    }
    useEffect(() => {
        getCartItems().then((data) => {
          if (data.error) {
            setError(data.error);
            toast({
              description: error,
            });
          } else if (!data.success) {
            setError("Cart Items could not be fetched");
          } else {
            let items: Item[] = (data.success)[0].items.flatMap((it, idx) => [
              {
                id: it.id,
                title: it.title,
                description: it.description,
                price: it.price,
              },
            ]);
            setCartItems(items);
            setPrice(items.reduce((total, item) => total + item.price, 0));
          }
        });
      }, []);
    return <div className="mx-2 lg:mx-8 pb-20 overflow-y-clip flex flex-col items-center">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid:cols-1">
            {cartItems.map((item, index) =>
                <CartItems
                    key={item.id}
                    title={item.title}
                    price={item.price}
                    stock={index % 5 + 1}
                    handleRemove={handleRemove} />
            )}
        </div>
        <CartFooter price={totalPrice} />
    </div>
}