import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { Card, CardContent } from "../ui/card";
import watchImg from "../../../public/image.png"


import Image from "next/image"
export default function BentoCard({ passImage, title }:
    any
) {
    return <div className="flex flex-col h-full">
        <div className="h-full">
        <Image src={watchImg} alt="watch image" className="h-full"/>
        </div>
        <div className="">
        <Button className="h-full w-full" >Buy</Button>
        </div>
    </div>
}