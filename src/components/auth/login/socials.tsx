import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"

export default function SocialsButton(){
    return <div
    className="flex items-center w-full gap-x-2"
    >
        <Button size={"lg"}
        className="w-full"
        variant={"outline"}
        >
            <FcGoogle className="h-7" size={"40"}/>&nbsp;&nbsp;Continue With Google
        </Button>
    </div>
}