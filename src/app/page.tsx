import { BlogsFiltersSection } from "@/components/business/blogs_filters_section";
import DashBoardPageMainComponent from "@/components/business/dashboard_page_main_component";
import BlogsPageSkeleton from "@/components/business/blogs_page_skeleton";
import { Suspense } from "react";

export default async function DashboardPage(props: PageProps<'/'>) {
  const { searchParams } = props;
  const params = await searchParams;
  const key = new URLSearchParams(params as any).toString();

  return (
    <div className="p-6 pt-0">
      {/* Filters Section */}
      <BlogsFiltersSection />

      <Suspense key={key} fallback={<BlogsPageSkeleton />}>
        <DashBoardPageMainComponent params={params} />
      </Suspense>
    </div>
  )
}
