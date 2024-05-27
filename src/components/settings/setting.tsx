import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export const SettingsPage = ()=> {
    return <div>
    <form action={
        async ()=>{
            await signOut()
        }
    }>
        <Button variant={"ghost"} type="submit">Sign Out</Button>
    </form>
</div>
}
