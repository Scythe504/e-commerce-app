import { Button } from "../ui/button";
import { CartButton } from "./cartbutton";
import Home from "./home";
import { SignInButton } from "./loginbutton";
import { SearchBar } from "./search-bar/search-bar";

export default function Navbar() {

    return <div className="sticky top-0 backdrop-blur-sm bg-transparent z-20 w-full py-4 px-16 border-b border-white">
        <div className="relative items-center grid grid-cols-12">
            <div className="col-span-3">
                <Home />
            </div>
            <div className="col-span-7">
                <SearchBar />
            </div>
            <div className="col-span-1">
                <CartButton />
            </div>
            <div className="col-span-1">
                <SignInButton />
            </div>
        </div>
    </div>
}