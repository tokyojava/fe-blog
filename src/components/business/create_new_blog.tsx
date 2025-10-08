"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function CreateBlogButton() {
    const router = useRouter();

    const handleAddProblem = () => {
        router.push("/blogs/create"); // Navigate to the "Add Problem" page
    };

    return (
        <div className="p-6">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Blogs</h1>
                <Button
                    onClick={handleAddProblem}
                >
                    + New Blog
                </Button>
            </div>
        </div>
    );
}
