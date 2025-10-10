import { BlogsFiltersSection } from "@/components/business/blogs_filters_section";
import BlogsPageMainComponent from "@/components/business/blogs_page_main_component";
import BlogsPageSkeleton from "@/components/business/blogs_page_skeleton";
import CreateBlogButton from "@/components/business/create_new_blog";
import { Suspense } from "react";

export default async function BlogsPage(props: PageProps<'/blogs'>) {
    const { searchParams } = props;
    const params = await searchParams;
    const key = new URLSearchParams(params as any).toString();

    return (
        <div className="p-6 pt-0">
            <CreateBlogButton />
            {/* Filters Section */}
            <BlogsFiltersSection />

            <Suspense key={key} fallback={<BlogsPageSkeleton />}>
                <BlogsPageMainComponent params={params} />
            </Suspense>
        </div>
    )
}
