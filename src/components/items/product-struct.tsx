import { Item, Review } from "@prisma/client"
import Image from "next/image"
import watchImg from "../../../public/image.png"
import { useEffect, useState } from "react"
import { getAllItems } from "@/actions/seed"
import { useToast } from "../ui/use-toast"
import { Button } from "../ui/button"
import { addToCart } from "@/actions/add-to-cart"
import { Card, CardContent, CardHeader } from "../ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "../ui/separator"
import { Star } from "lucide-react"
import { PostReview } from "../review/comment"
import { getAllReviews } from "@/actions/review"




const AllReviews = ({ id }: {
    id: string
}) => {
    console.log({ id })
    const [review, setReview] = useState<Review[]>([]);
    useEffect(() => {
        getAllReviews(id).then((resolve) => {
            console.log({
                resolve
            })
            if (resolve.success) {
                const data = resolve.success;
                let itemReview = data.review.flatMap(item => [item])
                setReview([...itemReview]);
                console.log({ itemReview })
            }
            // @ts-ignore
        }).catch(e => {
            console.error({ e });
        })
    }, [])

    review.forEach((item) => {
        console.log(item.content);
    })

    return <div className="w-full h-full">
        <ScrollArea className="w-full h-[500px]">
            <div className="h-full overflow-hidden w-full p-2">
                {review.map((rev) => (
                    <Card key={rev.id} className="rounded-lg">
                        <CardHeader className="flex flex-row w-full space-x-2">
                            {`User#${rev.reviewerId.slice(0, 9)}`}
                            <div className="flex ml-auto">
                                {rev.rating}<Star />
                            </div>
                        </CardHeader>
                        <CardContent>{rev.content}</CardContent>
                        <Separator />
                    </Card>
                ))
                }
            </div >
        </ScrollArea>
        <PostReview id={id} />
    </div>
}

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
                    className="sticky top-20 h-[450px] w-full pr-1"
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
                    {/* Reviews Here */}
                    <AllReviews id={item.id} />
                </div>
            </div>
        </div>
        {/* TODO - OTHERS Sample Picture */}
    </div>
}