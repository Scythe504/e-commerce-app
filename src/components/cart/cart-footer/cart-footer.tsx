import { Button } from "@/components/ui/button"
import Link from "next/link"

export const CartFooter = ({
    price
}: {
    price: number
}) => {
    return (<div
        className="fixed z-20 bg-[#ebe6e6] bg-opacity-100 bottom-0 border-t border-opacity-50 border-black w-full h-min-[100px]"
    >
        <div className="flex flex-row h-full justify-center my-4 lg:mx-20 mx-4">
            <div
                className="text-2xl flex-row"
            >
                &#8377;{price}
            </div>
            <Button
                className="ml-auto"
            >
                {/* TODO - IMPLEMENT STRIPE */}
                <Link
                    href="/checkout"
                    target="_self"
                >
                    Place Order
                </Link>
            </Button>
        </div>
    </div>)
}