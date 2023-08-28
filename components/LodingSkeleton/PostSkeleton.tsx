import React from "react";
import { Skeleton } from "../ui/skeleton";
import { BiDownvote, BiUpvote } from "react-icons/bi";

const PostSkeleton = () => {
  return (
    <div className="w-full h-80 flex gap-2 rounded-md border border-borderPrimary p-2">
      <div className="flex flex-col items-center">
        <BiUpvote
          size={24}
          className="text-mutedText group-hover:text-red-500"
        />
        <span className="text-sm">0</span>
        <BiDownvote
          size={24}
          className="text-mutedText group-hover:text-blue-500"
        />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="flex-1 h-8" />
        </div>
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  );
};

export default PostSkeleton;
