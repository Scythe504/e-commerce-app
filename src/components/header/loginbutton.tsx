"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { getLoginStatus } from "@/actions/authentication"
import { DropdownMenuDemo } from "./dropdown"
import { Button } from "../ui/button"
import blank from "../../../public/blank.svg"
import { User } from "lucide-react"


const Profile = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [image, setImage] = useState<string>("");
    useEffect(() => {
        getLoginStatus().then((data) => {
            if (data.success) {
                setImage(data.success)
            }
            if (data.error) {
                setIsLoggedIn(false);
            }
        })
    }, [])

    return (<>
        {!isLoggedIn
            ? <Button
                variant={"outline"}
            >
                <Link
                    href={`/auth/login`}
                    target="_self"
                >
                    Login
                </Link>
            </Button>
            : <>
                {image !== "" ?
                    <DropdownMenuDemo>
                        <Image
                            src={image}
                            alt="profilePicture"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    </DropdownMenuDemo>
                    :
                    <DropdownMenuDemo>
                        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <User size={40}/>
                        </div>
                    </DropdownMenuDemo>
                }
            </>
        }
    </>
    )
}

export const SignInButton = () => {
    return <Profile />
}