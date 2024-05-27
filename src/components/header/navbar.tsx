import Link from "next/link";
import { SignInButton } from "./loginbutton";
import { SearchBar } from "./search-bar/search-bar";

export default function Navbar() {

    return <div className="sticky top-0 backdrop-blur-sm bg-[#ebe6e6] bg-opacity-35 md:px-20 z-20 w-full py-4 px-12 border-b border-white">
        <div className="relative flex flex-row justify-center md:grid md:grid-cols-9 md:items-center">
            <div className="text-2xl font-semibold text-left self-start md:cols-span-5">
                <Link
                    href={`/`}
                    target="_self"
                >
                    <span className="w-fullnp">
                        NeoCom
                    </span>
                </Link>
            </div>
            <div className="ml-auto md:col-span-3 lg:w-[600px] md:w-[400px]">
                <SearchBar />
            </div>
            <div className="self-end md:col-span-1 lg:ml-20 md:ml-12">
                <SignInButton />
            </div>
        </div>
    </div>
}