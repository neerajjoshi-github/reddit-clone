import CommunitiesMenu from "@/components/CommunitiesMenu";
import CreatePostSection from "@/components/CreatePostSection";
import FiltersSection from "@/components/FiltersSection";
import PostSkeleton from "@/components/PostSkeleton";

export default function Home() {
  return (
    <main className="flex gap-4 p-4">
      <div className="flex-1 flex flex-col gap-4 overflow-auto">
        {/* POST SECTION */}
        <CreatePostSection />
        <FiltersSection />
        <PostSkeleton />
        <PostSkeleton />
      </div>
      <CommunitiesMenu />
    </main>
  );
}
