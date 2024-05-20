import { Button } from "@/components/ui/button"

export const CartItems = ()=> {

    return <div
    className="p-3 w-[300px] h-[400px] shadow-md rounded-sm mx-2 my-2"
    >
        <div className="grid grid-rows-8 h-full w-full">
            <div 
            className="row-span-4">
                Image
            </div>
            <div 
            className="row-span-2">
                Title
            </div>
            <div
            className="row-span-1"
            >
                Price
            </div>
            <div
            className="row-span-1"
            >
                Only 1 in stock left
            </div>
            <div 
            className="flex flex-col items-center justify-center gap-1 row-span-2"
            >
                <Button 
                className="w-full"
                variant={"outline"}
                >
                    Buy Now
                </Button>
                <Button 
                className="w-full"
                variant={"destructive"}
                >
                    Remove From Cart
                </Button>
            </div>
        </div>
    </div>
}