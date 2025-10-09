import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "./action";

export default async function Header() {
    const user = {name: 'test'};

    return (
        <header className="flex items-center justify-between p-4 px-6 bg-white">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-600">
                    <FaHome />
                    <span>Problems</span>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2">
                {
                    user ? (
                        <form action={signOut} className={"flex items-center space-x-4"}>
                            <span className="text-gray-600">Hi {user.name}</span>
                            <button type="submit" className="text-red-500 cursor-pointer hover:underline" title="Sign Out">
                                <FiLogOut />
                            </button>
                        </form>
                    ) : (
                        <Link href="/login" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    )
                }

            </div>
        </header>
    );
}
