import { Item, Review } from "@prisma/client"
import Image from "next/image"
import watchImg from "../../../public/image.png"
import { useEffect, useState } from "react"
import { getAllItems } from "@/actions/getItem"
import { useToast } from "../ui/use-toast"
import { Button } from "../ui/button"
import { addToCart } from "@/actions/add-to-cart"
import { Card, CardContent, CardHeader } from "../ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "../ui/separator"
import { Loader2, Star } from "lucide-react"
import { PostReview } from "../review/comment"
import { getAllReviews } from "@/actions/review"
import HashLoader from "react-spinners/HashLoader"
import { NoResultFound } from "../results/not-found"
import ClipLoader from "react-spinners/ClipLoader"



const AllReviews = ({ id }: {
    id: string | undefined
}) => {
    const [review, setReview] = useState<Review[]>([]);
    useEffect(() => {
        getAllReviews().then((resolve) => {
            if (resolve.success) {
                const data = resolve.success;
                let itemReview = data
                    .flatMap(item => item.review)
                    .filter(item => item.itemId === id)
                setReview([...itemReview]);
            }
            // @ts-ignore
        }).catch(e => {
            console.error({ e });
        })
    }, [])

    if (review.length === 0) {
        return <div className="p-4 text-center w-full">
            <NoResultFound />
            <PostReview id={id} />
        </div>
    }

    return (<div className="w-full h-full">
        <ScrollArea className="w-full h-[300px]">
            <div className="h-fit overflow-hidden w-full p-2">
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
    </div>)
}

export const ProductStruct = ({ id }: {
    id: string
}) => {
    const [item, setItem] = useState<Item>({
        id: "",
        title: "",
        description: "",
        price: 0,
        image: "",
    });
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState('');
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#1105f7");
    const [image, setImage] = useState("")
    const { toast } = useToast();
    useEffect(() => {
        getAllItems().then((data) => {

            if (!data) {
                toast({
                    description: "Item could not be found, Item might not be available or try again later"
                })
                return <div>
                    No Item Found
                </div>
            }
            const item = data.find((item) => item.id === id);
            if (!item) {
                return <div>
                    Item not found
                </div>
            }
            setItem(item);
            setImage(`https://utfs.io/a/dvt2tqmx9d/${item.image}`);
            setLoading(false)
        })
    }, [])

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
    return <div>
        {loading ?
            <div className="flex items-center justify-center h-screen pb-40">
                <ClipLoader
                    loading={loading}
                    color={color}
                    size={150}
                />
            </div>
            : (<div className="min-h-screen min-w-screen lg:mx-40 md:mx-20 m-4">
                <div className="lg:grid lg:grid-cols-2 h-full overflow-y-clip pb-40">
                    <div className="flex justify-start items-start">
                        <Image src={image}
                            alt="product image"
                            width={350}
                            height={400}
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
                            <AllReviews id={item?.id} />
                        </div>
                    </div>
                </div>
                {/* TODO - OTHERS Sample Picture */}
            </div>)}

    </div>
}