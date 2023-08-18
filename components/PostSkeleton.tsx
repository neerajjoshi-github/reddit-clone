import React from "react";
import { Skeleton } from "./ui/skeleton";

const PostSkeleton = () => {
  return (
    <div className="w-full h-80 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="flex-1 h-8" />
      </div>
      <Skeleton className="w-full h-8" />
      <Skeleton className="w-full h-full" />
    </div>
  );
};

export default PostSkeleton;
