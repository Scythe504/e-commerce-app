"use client"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import Link from "next/link"

export const SignInButton = ()=> {

    return <div className="ml-4 w-fit">
        <Link 
            href={"/auth/login"}
            target="_self"
        >
            <Button variant={"outline"}>
                Login
            </Button>
        </Link>
        </div>
}