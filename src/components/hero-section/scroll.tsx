"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";
import Image from "next/image";
import image from "@/images.json"

export function HeroScrollDemo() {

  const imageUrl = image.tech[1]

  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              AND<br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                With The Best Prices
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={imageUrl}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}

