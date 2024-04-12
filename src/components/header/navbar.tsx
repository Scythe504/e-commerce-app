import { Button } from "../ui/button";
import Home from "./home";
import { SignInButton } from "./loginbutton";

export default function Navbar (){

    return <div className="sticky top-0 backdrop-blur-sm bg-transparent z-20 w-full py-4 px-16 border-b border-white">
        <div className="relative flex items-center">
            <Home/>
            <SignInButton/>
        </div>
    </div>
}