"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function EditBlogButton({ blogId }: { blogId: string }) {

    return <Button asChild className="cursor-pointer" variant="secondary">
        <Link href={`/blogs/${blogId}/edit`}>
            Edit
        </Link>
    </Button>
}

