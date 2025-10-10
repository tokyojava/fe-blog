"use client";

import { useRouter } from "next/navigation";

export function BackToList() {
    const router = useRouter();

    const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.push("/blogs");
    };

    return (
        <button onClick={handleBack} className="cursor-pointer ml-4 mb-2 text-blue-600 hover:underline">
            ← Back to List
        </button>
    );
}