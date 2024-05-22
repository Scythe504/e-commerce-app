import { Item } from "@prisma/client"
import Image from "next/image"
import watchImg from "../../../public/image.png"
import { useEffect, useState } from "react"
import { getAllItems } from "@/actions/seed"
import { useToast } from "../ui/use-toast"
import { Button } from "../ui/button"
import { addToCart } from "@/actions/add-to-cart"

export const ProductStruct = ({ id }: {
    id: string
}) => {
    const [item, setItem] = useState<Item>();
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState('');

    const { toast } = useToast();
    useEffect(() => {
        getAllItems().then((data) => {
            console.log({ data });
            if (!data) {
                toast({
                    description: "Item could not be found, Item might not be available or try again later"
                })
                return <div>
                    Item not found
                </div>
            }
            const item = data.find((item) => item.id === id);
            if (!item) {
                return <div>
                    Item not found
                </div>
            }
            console.log({ item });
            setItem(item);
        })
    }, [])
    if (item === undefined) {
        return <div className="w-screen h-screen flex items-center justify-center">
            404 | Not Found
        </div>
    }

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
    console.log({ item })
    return <div className="min-h-screen min-w-screen lg:mx-40 md:mx-20 m-4">
        <div className="lg:grid lg:grid-cols-2 h-full overflow-y-clip pb-40">
            <div className="flex justify-start items-start">
                <Image src={watchImg} alt="watchImg"
                    className="sticky top-20 h-[450px] w-full"
                />
            </div>
            <div className="flex flex-col space-y-4 p-8 h-full">
                <div className="text-4xl">
                    {item?.title}
                </div>
                <div className="text-4xl">
                    &#x20b9; {item?.price}
                </div>
                <div>
                    {item?.description}
                </div>
                <Button onClick={() => handleClick({ item })}>
                    Add to Cart
                </Button>
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl">Reviews</h1>
                    <div className="w-full h-[300px] overflow-y-scroll ">
                        <div>Review 1</div>
                        <div>Review 3</div>
                        <div>Review 1</div>
                        <div>Review 4</div>
                        <div>Review 1</div>
                        <div>Review 3</div>
                        <div>Review 1</div>
                        <div>Review 4</div>
                        <div>Review 1</div>
                        <div>Review 3</div>
                        <div>Review 1</div>
                        <div>Review 4</div>
                        <div>Review 1</div>
                        <div>Review 3</div>
                        <div>Review 1</div>
                        <div>Review 4</div>
                        <div>Review 1</div>
                        <div>Review 3</div>
                        <div>Review 1</div>
                        <div>Review 4</div>
                    </div>
                </div>
            </div>
        </div>
        {/* TODO - OTHERS Sample Picture */}
            <div className="gap-1 items-start w-full h-[100px] overflow-x-scroll overflow-y-clip flex flex-row justify-center bottom-0">
                <Image src={watchImg} alt="watch" height={100} />
                <Image src={watchImg} alt="watch" height={100} />
                <Image src={watchImg} alt="watch" height={100} />
                <Image src={watchImg} alt="watch" height={100} />
                <Image src={watchImg} alt="watch" height={100} />
                <Image src={watchImg} alt="watch" height={100} />
                <Image src={watchImg} alt="watch" height={100} />
                <Image src={watchImg} alt="watch" height={100} />
                <Image src={watchImg} alt="watch" height={100} />
                <Image src={watchImg} alt="watch" height={100} />
                <Image src={watchImg} alt="watch" height={100} />
                <Image src={watchImg} alt="watch" height={100} />
                <Image src={watchImg} alt="watch" height={100} />
            </div>
    </div>
}