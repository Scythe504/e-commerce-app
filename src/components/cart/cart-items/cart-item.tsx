import { Button } from "@/components/ui/button"
import Image from "next/image"
import watchImg from "../../../../public/image.png"
export const CartItems = () => {

    return <div
        className="p-3 w-[300px] h-fit shadow-md rounded-sm mx-2 my-2"
    >
        <div className="grid grid-rows-7 h-full w-full">
            <Image src={watchImg} alt="watchImg" className="row-span-4 h-full mb-1" />
            <div
                className="row-span-2 overflow-clip text-xl font-semibold"
            >
                Title
            </div>
            <div
                className="row-span-1 text-xl font-semibold"
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
