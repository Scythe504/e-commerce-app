"use client"
import Image from "next/image";
import pattern from "../../../../public/topography.svg"
import LoginCard from "./login-card";


export default function Login(){

    return <div className="flex items-center justify-center w-[900px] shadow-lg fixed rounded-lg ">
        <div className="grid grid-cols-2">
        <div className="bg-transparent overflow-hidden">
            <Image src={pattern} alt="pattern"/>
        </div>
        <div>
            <LoginCard/>
        </div>
    </div>
    </div>

}