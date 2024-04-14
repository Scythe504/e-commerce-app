import { cn } from "@/lib/utils";
import BentoCard  from "./card";
import watchImg from "../../../public/image.png"

export default function Structure () {
    
    return <div className="grid w-full grid-cols-12 h-screen rounded-lg gap-2"> 
        <div className={cn(`row-span-2 col-span-5`)}>
            <BentoCard passImage={watchImg} title={1}/>
            </div>
        <div className={cn(`row-span-2 col-span-7 `)}> <BentoCard title={2}/></div>
        <div className={cn(`row-span-2 col-span-7 `)}> <BentoCard title={3}/></div>
        <div className={cn(`row-span-2 col-span-5 `)}> <BentoCard title={4}/></div>
        <div className={cn(`row-span-2 col-span-6 `)}> <BentoCard title={5}/></div>
        <div className={cn(`row-span-2 col-span-6 `)}> <BentoCard title={6}/></div>
    </div>
}