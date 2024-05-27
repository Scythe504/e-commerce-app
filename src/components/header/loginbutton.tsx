"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { getLoginStatus } from "@/actions/authentication"


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
    }, [window.location])

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
                    <DropdownMenu>
                        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                        </div>
                    </DropdownMenu>

                }
            </>
        }
    </>
    )
}
import {
    Cloud,
    CreditCard,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    ShoppingCart,
    User,
    UserPlus,
    Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaGithub } from "react-icons/fa"

export function DropdownMenuDemo({ children }: {
    children: React.ReactNode
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="object-contain text-clip rounded-full">
                    {children}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link
                        href={'/settings'}
                        target="_self"
                    >
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            Profile
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Purchases</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <Link
                        href={`/cart`}
                        target="_self"
                    >
                        <DropdownMenuItem>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            <span>Cart</span>
                            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <UserPlus className="mr-2 h-4 w-4" />
                            <span>Invite users</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                    <Mail className="mr-2 h-4 w-4" />
                                    <span>Email</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    <span>Message</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    <span>More...</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <Link
                        href={`/merchant/add-items`}
                        target="_self"
                    >
                        <DropdownMenuItem>
                            <Plus className="mr-2 h-4 w-4" />
                            <span>Add Your Product  </span>
                            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <Link
                    href={`https://github.com/Scythe504/scythe-s-neo-com`}
                    target="_blank"
                >
                    <DropdownMenuItem>
                        <FaGithub className="mr-2 h-4 w-4" />
                        <span>GitHub</span>
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


export const SignInButton = () => {
    return <Profile />
}