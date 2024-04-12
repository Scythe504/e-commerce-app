import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import SocialsButton from "./socials";
import { Button } from "@/components/ui/button";

export default function LoginCard (){
    return <Card className="h-full flex flex-col items-center justify-center">
        <CardHeader className="text-4xl font-semibold">Welcome</CardHeader>
        <CardContent>
            <div>
            <SocialsButton/>
            </div>
            <div>
                <legend>Or</legend>
            </div>
            
        </CardContent>
        <CardFooter>
            <Button>
                Login
            </Button>
        </CardFooter>
    </Card>
}