import { Button } from "../ui/button";

const DetailsCard = ({ title, description, handleClick }: {
    title: string,
    description: string | null
    handleClick: () => {}
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

        <Button className="mt-4"
            onClick={handleClick}
        >
            Add to cart
        </Button>
    </div>
}

export default DetailsCard;