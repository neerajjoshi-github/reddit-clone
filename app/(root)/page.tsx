import CommunitiesMenu from "@/components/CommunitiesMenu";
import CreatePostSection from "@/components/CreatePostSection";
import FiltersSection from "@/components/FiltersSection";

export default function Home() {
  return (
    <main className="flex gap-4 p-4">
      <div className="flex-1 flex flex-col gap-4 overflow-auto">
        {/* POST SECTION */}
        <CreatePostSection />
        <FiltersSection />
        <div className="w-full h-[400px] bg-blue-50 text-xl text-black">
          SECTION 1
        </div>
        <div className="w-full h-[400px] bg-blue-50 text-xl text-black">
          SECTION 2
        </div>
        <div className="w-full h-[400px] bg-blue-50 text-xl text-black">
          SECTION 3
        </div>
        <div className="w-full h-[400px] bg-blue-50 text-xl text-black">
          SECTION 4
        </div>
      </div>
      <CommunitiesMenu />
    </main>
  );
}
