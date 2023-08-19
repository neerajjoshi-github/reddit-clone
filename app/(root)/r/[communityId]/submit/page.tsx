import CreatePost from "@/components/CreatePost";
import Seprator from "@/components/Seprator";
import React from "react";

const page = ({ params }: { params: { communityId: string } }) => {
  return (
    <div className="flex-1 flex flex-col gap-4 overflow-auto">
      <h2 className="text-3xl font-semibold">Create Post</h2>
      <Seprator />
      <CreatePost communityId={params.communityId} />
    </div>
  );
};

export default page;
