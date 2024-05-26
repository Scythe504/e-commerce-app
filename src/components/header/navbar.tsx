import { CartButton } from "./cartbutton";
import { SignInButton } from "./loginbutton";
import { SearchBar } from "./search-bar/search-bar";

export default function Navbar() {

    return <div className="sticky top-0 backdrop-blur-sm bg-transparent md:px-20 z-20 w-full py-4 px-12 border-b border-white">
        <div className="relative flex flex-row justify-center md:grid md:grid-cols-9 md:items-center">
            <div className="text-2xl font-semibold text-left self-start md:cols-span-5">
                NeoCom
            </div>
            <div className="ml-auto md:col-span-2 md:w-[700px]">
                <SearchBar />
            </div>
            <div className="hidden md:block md:col-span-2 md:ml-8">
                <CartButton />
            </div>
            <div className="self-end md:col-span-1 md:ml-4">
                <SignInButton />
            </div>
        </div>
    </div>
}