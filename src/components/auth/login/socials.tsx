import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { FcGoogle } from "react-icons/fc"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

export default function SocialsButton(){
    const onClickHandler = ()=>{
        try {
            signIn("google",{
                callbackUrl : DEFAULT_LOGIN_REDIRECT
            })
        } catch (error) {
            console.error({error})
        }
       
    }

    return <div
    className="flex items-center w-full gap-x-2"
    >
        <Button size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={()=>onClickHandler()}
        >
            <FcGoogle className="h-7" size={"40"}/>&nbsp;&nbsp;Continue With Google
        </Button>
    </div>
}