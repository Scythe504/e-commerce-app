import { Button } from "@/components/ui/button"
import Image from "next/image"
import watchImg from "../../../../public/image.png"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import Link from "next/link"
export const CartItems = ({
    title,
    price,
    id,
    stock,
    imageUrl,
    handleRemove,
}: {
    title: string,
    id : string,
    price: number,
    stock: number,
    imageUrl: string,
    handleRemove: () => void
}) => {

    let stockLeft: Readonly<string>;
    if (stock > 5) {
        stockLeft = `In stock`
    } else {
        stockLeft = `Only ${stock} in stock available`
    }
    let image = `https://utfs.io/a/dvt2tqmx9d/${imageUrl}`
    return (<div className="p-2">
        <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
            <Link
                href={`/item/${id}`}
            >
                <Image
                    src={image}
                    alt="img"
                    height={250}
                    width={250}
                    className="object-contain"
                />
                <p className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                    {title}
                </p>
                <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                    &#8377;{price}
                </p>
                <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                    {stockLeft}
                </p>
            </Link>
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
        </BackgroundGradient >
    </div >
    )
}
