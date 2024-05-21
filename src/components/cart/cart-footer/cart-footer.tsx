import { Button } from "@/components/ui/button"

export const CartFooter = () => {
    return (
    <div
        className="fixed z-20 bg-[#ebe6e6] bg-opacity-100 bottom-0 border-t border-opacity-50 border-black w-full h-min-[100px]"
    >
        <div className="flex flex-row h-full justify-center my-4 mx-20">
            <div 
                className="text-2xl"
            >
                $700000
            </div>
            <Button
                className="ml-auto"
            >
                Place Order
            </Button>
        </div>
    </div>)
}