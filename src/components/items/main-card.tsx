import Image from "next/image";
import { DetailsCard } from "./detail-card";
import { Separator } from "../ui/separator";

export const ProductCard = ({ title, rating, id, description, totalReviews, imageUrl, handleClick }: {
    title: string,
    description: string,
    rating: number,
    id: string,
    totalReviews: number,
    imageUrl: string,
    handleClick: () => {}
}) => {
    let image = `https://utfs.io/a/dvt2tqmx9d/${imageUrl}`
    return <div className="lg:px-40 flex flex-col w-full h-full">
        <div className="flex flex-row w-full mx-3 p-1 text-start h-full">
            <div className="w-[350px]">
                <Image
                    src={image}
                    alt="watchImg"
                    className="h-full object-contain"
                    height={350}
                    width={390}
                />
            </div>

            <div className="flex-1 flex flex-col justify-between max-w-md object-contain">
                <DetailsCard
                    title={title}
                    description={description}
                    handleClick={handleClick}
                    rating={rating}
                    id={id}
                    totalReviews={totalReviews}
                />
            </div>

        </div>
        <div className="w-full overflow-x-hidden">
            <Separator className="bg-white" />
        </div>
    </div >

}
