import { cn } from "@/lib/utils";
import BentoCard from "./card";
import watchImg from "../../../public/image.png"

export default function Structure() {

    return <div className="grid grid-row-8 grid-cols-3 gap-2 border h-full border-black">
        <div className="col-span-1 row-span-full h-full w-full">
            <BentoCard />
        </div>
        <div className="col-span-1 row-span-full h-full">
            <BentoCard />
        </div>
        <div className="grid grid-rows-2 gap-2 h-full">
            <div className="row-span-1 col-span-full">  
                <BentoCard />
            </div>
            <div className="row-span-1 col-span-full">
                <BentoCard/>
            </div>
        </div>
    </div>
}