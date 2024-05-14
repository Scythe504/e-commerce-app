import { HiOutlineShoppingBag } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import Link from "next/link"
export const CartButton = () => {
    return <div className={cn("flex flex-col items-center ml-12")}>
        <Link 
            href="/cart"
            target="_self"
        >
            <HiOutlineShoppingBag size={28}/>
        </Link>
        
    </div>
}
