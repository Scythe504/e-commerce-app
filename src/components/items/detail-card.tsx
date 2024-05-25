import { Star } from "lucide-react";
import { Button } from "../ui/button";

export const DetailsCard = ({ title, description, rating, totalReviews, handleClick }: {
    title: string,
    rating: number,
    description : string,
    totalReviews : number,
    handleClick: () => {}
}) => {
    return <div className="flex flex-col p-6 gap-2 overflow-hidden h-full">
        <br />
        <br></br>
    <div className="text-4xl w-full h-full pb-12 flex-grow-1">
        {title}
        <br />
        <br />
        <br />
        <p className="text-xl lg:block hidden">{description}</p>
    </div>
    
    <div className="flex flex-row">
        {rating}<Star/>{`(${totalReviews})`}
    </div>
    <Button className="w-40" onClick={handleClick}>
        Add to Cart
    </Button>
</div>
}