"use client";

import { Button } from "@/components/ui/button";
import { useCallback, useTransition } from "react";
import { toast } from "sonner";
import { deleteBlogAction } from "./action";
import { useRouter } from "next/navigation";
import { ActionAPIResponse } from "@/lib/api";

export function DeleteBlogButton({ blogId, redirectToBlogPage }: { blogId: string, isMyBlog?: boolean, redirectToBlogPage?: boolean }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleClick = useCallback(() => {
        startTransition(async () => {
            const result = (await deleteBlogAction(blogId, redirectToBlogPage ?? false)) as ActionAPIResponse<null>;
            if (result) {
                if (!result.success) {
                    toast.error("Failed to delete blog");
                } else {
                    toast.success("Blog deleted");
                    if (redirectToBlogPage) {
                        router.push('/blogs');
                    }
                }
            }

        });
    }, [blogId]);

    return <Button onClick={handleClick} className="cursor-pointer" type='submit' variant="destructive">
        {isPending ? "Deleting..." : "Delete"}
    </Button>
}

