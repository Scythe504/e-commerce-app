"use client"
import Image from "next/image";
import pattern from "../../../../public/topography.svg"
import LoginCard from "./login-card";


export default function Login(){

    return <div className="flex items-center justify-center w-[900px] md:shadow-lg fixed rounded-xl">
        <div className="md:grid md:grid-cols-2">
        <div className="bg-transparent overflow-hidden hidden md:block">
            <Image src={pattern} alt="pattern"/>
        </div>
        <div>
            <LoginCard/>
        </div>
    </div>
    </div>

}