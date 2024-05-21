import { useEffect, useState } from "react"
import { CartFooter } from "./cart-footer/cart-footer"
import { CartItems } from "./cart-items/cart-item"
import { useToast } from "../ui/use-toast"
import { Item } from "@prisma/client"
import { getCartItems } from "@/actions/getCartItems"


export const MainCart = () => {
    
    const { toast } = useToast();
    const [error, setError] = useState<string | undefined>("");
    const [cartItems, setCartItems] = useState<Item[]>([]);
    // TODO - implement a removeItemFromCartActions later on
    const handleRemove = ()=> {
        toast({
            description : "Item has been removed"
        })
    }

    useEffect(()=>{
        getCartItems().then((data)=>{
            if (data.error){
                setError(data.error)
            } else if(!data.success){
                setError("Cart Items could not be fetched")
            } else {
                let items: Item[] = [];
                let item = data.success;
                for(let i = 0; i<item.length; i++) {
                    items.push({
                        id: item[i].items[i].id,
                        title: item[i].items[i].title,
                        price: item[i].items[i].price,
                        description: item[i].items[i].description,
                        cartId: item[i].items[i].cartId,
                    })
                }
                setCartItems(prevItem=> [...prevItem, ...items])
            }
        })
    },[])

    return <div>
        {cartItems.map((item, index)=>
            <CartItems key={item.id} title={item.title} price={item.price} stock={index % 8} handleRemove={handleRemove} />
        )}
        <CartFooter />
    </div>
}