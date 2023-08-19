import HomePageSidebar from "@/components/HomePageSidebar";
import CreatePostSection from "@/components/CreatePostSection";
import FiltersSection from "@/components/FiltersSection";
import PostSkeleton from "@/components/PostSkeleton";
import SidebarPageLayout from "@/components/SidebarPageLayout";

export default function Home() {
  return (
    <SidebarPageLayout>
      <>
        <CreatePostSection />
        <FiltersSection />
        <PostSkeleton />
        <PostSkeleton />
      </>
      <>
        <HomePageSidebar />
      </>
    </SidebarPageLayout>
  );
}
