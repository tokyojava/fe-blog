"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function CreateBlogButton() {
    const router = useRouter();

    const handleAddProblem = () => {
        router.push("/blogs/create"); // Navigate to the "Add Problem" page
    };

    return (
        <div className="text-lg flex justify-between items-center mb-4">
            <h1 className="font-bold">My Blogs</h1>
            <Button
                onClick={handleAddProblem}
            >
                + New Blog
            </Button>
        </div>
    );
}
