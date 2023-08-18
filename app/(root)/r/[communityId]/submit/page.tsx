import CreatePost from "@/components/CreatePost";
import Seprator from "@/components/Seprator";
import React from "react";

const page = ({ params }: { params: { communityId: string } }) => {
  return (
    <main className="flex gap-4 p-4 min-h-screen">
      <div className="flex-1 flex flex-col gap-4 overflow-auto">
        <h2 className="text-3xl font-semibold">Create Post</h2>
        <Seprator />
        <CreatePost communityId={params.communityId} />
      </div>
      <div className="max-lg:hidden relative min-w-[300px] max-w-[300px] p-2  flex flex-col gap-4">
        <div className="sticky top-[72px] left-0 bg-[#04090a] w-full  rounded-lg">
          Sidebar
        </div>
      </div>
    </main>
  );
};

export default page;
