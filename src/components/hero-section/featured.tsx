import { cn } from "@/lib/utils";
import Image from "next/image"
import image from "@/images.json"
import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
    IconArrowWaveRightUp,
    IconBoxAlignRightFilled,
    IconBoxAlignTopLeft,
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";

export function BentoGridDemo() {
    return (
        <BentoGrid className="max-w-4xl mx-auto">
            {items.map((item, i) => (
                <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                />
            ))}
        </BentoGrid>
    );
}
const items = [
    {
        title: "The Dawn of Innovation",
        description: "Explore the best ARM based Laptops, with the most efficient and powerful Process.",
        header: <Image
            src={image.tech[2]}
            alt="0"
            height={100}
            width={500}
        />,
    },
    {
        title: "The Style Revolution",
        description: "Dive into the world of comfort and style with these shoes.",
        header: <Image
            src={image.footwear["red-nike"]}
            alt="0"
            className="object-contain"
            height={100}
            width={500}
        />,
    },
    {
        title: "The Ultimate Gaming Laptop",
        description: "Discover fast and Performant Gaming Laptops.",
        header: <Image
            src={image.tech["razor-laptop"]}
            alt="0"
            className="object-contain"
            height={100}
            width={500}
        />,
    },
    {
        title: "The Joy of Creation",
        description: "Experience the thrill of bringing ideas to life.",

        header: <Image
            src={image.tech["ipad"]}
            alt="0"
            className="object-contain w-full h-48 bg-gradient-to-br from-neutral-900 dark:from-neutral-700 dark:to-neutral-700 to-neutral-950"
            height={50}
            width={200}
        />
    },
    {
        title: "The Pursuit of quality",
        description: "Get the best Smartphones of the best quality.",
        header: <Image
            src={image.tech.samsung}
            alt="0"
            className="object-contain"
            height={100}
            width={500}
        />,
    },
    {
        title: "Capture the Beauties Of Life",
        description: "Capture breathtaking pictures with the best cameras.",
        header: <Image
            src={image.tech["sony"]}
            alt="1"
            className="object-contain"
            height={100}
            width={500}
        />,
    },
    {
        title: "The Spirit of Adventure",
        description: "Embark on exciting journeys and thrilling discoveries.",
        header: <Image
            src={image.footwear["nike"]}
            alt="0"
            className="object-contain w-full h-48 bg-gradient-to-br from-neutral-950 dark:from-neutral-700 dark:to-neutral-700 to-neutral-950"
            height={100}
            width={500}
        />,
    },
];
