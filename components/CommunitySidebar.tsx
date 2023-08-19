import React from "react";
import Seprator from "./Seprator";
import { Button } from "./ui/button";
import JoinButton from "./JoinButton";
import Image from "next/image";
import { PiCakeDuotone } from "react-icons/pi";
import { formatTimestamp } from "@/lib/utils";
import { Community } from "@/store/communityStore";
import UpdateCommunity from "./UpdateCommunity";

type CommunitySidebarProps = {
  community: Community;
};

const CommunitySidebar: React.FC<CommunitySidebarProps> = ({ community }) => {
  return (
    <div className="sticky top-[72px] left-0 w-full  flex flex-col gap-4 overflow-y-auto">
      <div className="bg-black">
        <div className="relative h-24 rounded-lg">
          <Image
            fill
            src="/images/recCommsArt.png"
            alt="Community Cover Image"
            className="rounded-t-lg object-cover"
          />
        </div>
        <div className="px-2 py-4 flex flex-col gap-4 w-full border-x border-b border-borderPrimary rounded-b-md">
          <div className="flex gap-2 items-center">
            <PiCakeDuotone size={20} />
            <p className="text-sm text-mutedText">
              Created {formatTimestamp(community.createdAt!)}
            </p>
          </div>
          <Seprator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-whitesmoke font-semibold">
                {community.numberOfMembers}
              </p>
              <p className="text-xs text-mutedText">Members</p>
            </div>
            <div>
              <div className="flex gap-1 items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <p className="text-sm text-whitesmoke font-semibold">1</p>
              </div>
              <p className="text-xs text-mutedText">Online</p>
            </div>
            <div>
              <p className="text-sm text-whitesmoke font-semibold">Top 1%</p>
              <p className="text-xs text-mutedText">Ranked by size</p>
            </div>
          </div>
          <Seprator />
          <div className="flex flex-col gap-2">
            <Button variant="reverse">Create Post</Button>
            <JoinButton isBlue community={community} />
          </div>
        </div>
      </div>
      <UpdateCommunity community={community} />
    </div>
  );
};

export default CommunitySidebar;
