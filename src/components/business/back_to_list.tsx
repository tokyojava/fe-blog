"use client";

import { useRouter } from "next/navigation";

export function BackToList() {
    const router = useRouter();

    const handleBack = () => {
        router.push("/blogs");
    };

    return (
        <button onClick={handleBack} className="ml-4 mb-4 text-blue-600 hover:underline">
            ← Back to List
        </button>
    );
}