"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SocialsButton from "./socials";
import LoginForm from "./loginForm";

export default function LoginCard (){
    return <Card className="h-full flex flex-col items-center justify-center">
        <CardHeader className="text-4xl font-semibold">Welcome</CardHeader>
        <CardContent className="w-96">
            <div className="mb-6">
            <SocialsButton/>
            </div>
            <div>
                <LoginForm/>
            </div>
        </CardContent>
    </Card>
}