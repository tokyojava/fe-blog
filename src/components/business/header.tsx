"use client";

import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "./action";
import { useEffect, useState } from "react";
import { TokenPayload } from "@/lib/token";
import { useAuthStore } from "@/lib/store";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
    const [userFetched, setUserFetched] = useState(false);
    const pathname = usePathname();

    const { user, setUser } = useAuthStore();

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/me');
            if (res.ok) {
                const json = await res.json();
                setUser(json.data as TokenPayload);
                console.log("fetched user", json.data);
            }
            setUserFetched(true);
        })();
    }, [setUserFetched, setUser]);

    return (
        <header className="flex items-center justify-between p-4 px-6 bg-white">
            {/* Left Section */}
            <div className="flex items-center space-x-26">
                <div className="flex items-center space-x-2 text-gray-600">
                    <FaHome />
                    <span className="hidden lg:block">Record your life!</span>
                </div>
                <div className="flex item-center space-x-4">
                    <Link href="/" className={
                    clsx("text-sm lg:text-md text-blue-600 hover:underline", {
                        "font-bold": pathname === "/"
                    })
                }>
                    Dashboard
                </Link>
                <Link href="/blogs" className={
                    clsx("text-sm lg:text-md text-blue-600 hover:underline", {
                        "font-bold": pathname.startsWith("/blogs")
                    })
                }>
                    My Blogs
                </Link>
                </div>
            </div>

            {
                userFetched && <div className="flex items-center space-x-2">
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
            }
        </header>
    );
}
