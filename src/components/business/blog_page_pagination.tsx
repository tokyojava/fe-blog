"use client";

import { useCallback, useState } from "react";
import { MyPagination } from "../ui/my_pagination";
import { usePathname, useRouter } from "next/navigation";

interface BlogPagePaginationProps {
    initialPage: string;
    totalPages: number;
}
export function BlogPagePagination(props: BlogPagePaginationProps) {
    const { initialPage, totalPages } = props;

    const [page, setPage] = useState(parseInt(initialPage));
    const router = useRouter();
    const pathname = usePathname();

    const updatePage = useCallback((newPage: number) => {
        setPage(newPage);
        const url = new URL(window.location.href);
        url.searchParams.set('page', newPage.toString());

        router.replace(`${pathname}?${url.searchParams.toString()}`);
    }, [pathname, router]);

    return (
        <MyPagination page={page} total={totalPages} onPageChange={updatePage} />
    )
}