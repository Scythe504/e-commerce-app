import { Button } from "../ui/button";
import AddToCartButton from "./add-cart-button";

const DetailsCard = ({ title, description }: {
    title: string,
    description: string | null
}) => {
    return <div className="flex flex-col p-6 gap-2 overflow-hidden">
        <div className="h-3/4 w-full">
            <h1 className="text-3xl">
                {title}
            </h1>

            <p className="text-md">
                {description}
            </p>
        </div>

        <AddToCartButton/>
    </div>
}

export default DetailsCard;