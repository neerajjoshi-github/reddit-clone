import Image from "next/image";
import { FC } from "react";
import JoinButton from "./JoinButton";
import { Community } from "@/store/communityStore";

type CommunityHeaderProps = {
  community: Community;
};

const CommunityHeader: FC<CommunityHeaderProps> = ({ community }) => {
  return (
    <div className="w-full flex gap-4 items-center">
      <div>
        {community.imageUrl ? (
          <div className="relative rounded-full w-20 h-20 mx-auto">
            <Image
              src={community.imageUrl}
              fill
              className="rounded-full object-cover"
              alt="Community Profile Image"
            />
          </div>
        ) : (
          <div className="rounded-full w-14 h-14 bg-blue-500 border-[3px] border-white flex items-center justify-center">
            <span className="text-4xl font-bold">r/</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-lg font-semibold">{community.id}</p>
        <p className="text-sm text-mutedText">r/{community.id}</p>
      </div>
      <JoinButton className="ml-auto" community={community} />
    </div>
  );
};

export default CommunityHeader;
