import { Star } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export const DetailsCard = ({ title, id, description, rating, totalReviews, handleClick }: {
    title: string,
    rating: number,
    description: string,
    totalReviews: number,
    id: string
    handleClick: () => {}
}) => {
    return (<div className="flex flex-col p-6 gap-2 overflow-hidden h-full">
        <br />
        <br></br>
        <Link
            key={id}
            href={`/item/${id}`}
            target={"_self"}
        >
            <div className="text-4xl w-full h-full pb-12 flex-grow-1 line-clamp-2">
                {title}
                <br />
                <br />
                <p className="text-xl lg:block hidden overflow-ellipsis h-[305px]">{description.trim()}</p>
            </div>
        </Link>
        <div className="flex flex-row">
            {rating}<Star />{`(${totalReviews})`}
        </div>
        <Button className="w-40" onClick={handleClick}>
            Add to Cart
        </Button>
    </div>)
}