import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { Card, CardContent } from "../ui/card";
import watchImg from "../../../public/image.png"


import Image from "next/image"
export default function BentoCard({ passImage, title }:
    any
) {
    return <div className="h-full rounded-xl bg-white">
        <div className="h-full grid grid-row-3 grid-cols-5 items-center justify-center">
            <div className="grid grid-row-12 h-full col-span-3 overflow-hidden rounded-xl">
                <Image src={watchImg} alt="product Image" className="h-full row-span-11 rounded-xl"/>
                
                    <Button variant={"outline"} className="bg-green-500 row-span-1 w-full h-full rounded-xl">Buy Now</Button>
            </div>
            <div className="grid grid-row-3 h-full">
                <div className="row-span-2">
                    {title}
                </div>
            </div>

        </div>
    </div>
}