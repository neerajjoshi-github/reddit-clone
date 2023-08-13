"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import useCreateCommunityStore from "@/store/CreateCommunityModalStore";

const CommunitiesMenu = () => {
  const createCommunityModal = useCreateCommunityStore();
  return (
    <div className="max-lg:hidden relative min-w-[300px] max-w-[300px] p-2  flex flex-col gap-4">
      <div className="w-full bg-[#04090a] border border-borderPrimary rounded-md">
        <div className="relative w-full h-10">
          <Image
            src="/images/recCommsArt.png"
            fill
            alt="Background Art"
            className="object-cover rounded-t-md"
          />
        </div>
        <div className="flex items-center gap-3 px-2">
          <Image
            src="/images/reddit-full-body.png"
            width={45}
            height={45}
            alt="Reddit Logo"
            className="object-cover -mt-4 z-[1]"
          />
          <h3 className="font-semibold text-lg">Home</h3>
        </div>
        <div className="m-2 border-t border-borderPrimary flex flex-col gap-2 py-3">
          <Button variant="reverse">Create Post</Button>
          <Button
            onClick={createCommunityModal.open}
            variant="outline"
            className="font-bold border-2"
          >
            Create Community
          </Button>
        </div>
      </div>
      <div className="sticky top-[72px] left-0 bg-[#04090a] w-full border border-borderPrimary rounded-md px-2 py-4">
        <h3 className="text-sm font-bold">POPULAR COMMUNITIES</h3>
        <div className="px-2 mt-4">
          {/* TEST PLACEHOLDER */}
          <div className="flex items-center gap-2 hover:bg-secondary cursor-pointer px-2 py-2 rounded-md">
            <div className="relative w-8 h-8 rounded-full">
              <Image
                src="/images/redditPersonalHome.png"
                fill
                alt="Community Profile Image"
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm">r/FunnyCat</h4>
              <p className="text-xs text-mutedText">6,454,456 members</p>
            </div>
          </div>
          {/* TEST PLACEHOLDER */}
          <div className="flex items-center gap-2 hover:bg-secondary cursor-pointer px-2 py-2 rounded-md">
            <div className="relative w-8 h-8 rounded-full">
              <Image
                src="/images/redditFace.svg"
                fill
                alt="Community Profile Image"
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm">r/Reddit</h4>
              <p className="text-xs text-mutedText">454,456 members</p>
            </div>
          </div>
          {/* TEST PLACEHOLDER */}
          <div className="flex items-center gap-2 hover:bg-secondary cursor-pointer px-2 py-2 rounded-md">
            <div className="relative w-8 h-8 rounded-full">
              <Image
                src="/images/recCommsArt.png"
                fill
                alt="Community Profile Image"
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm">r/Red Hand</h4>
              <p className="text-xs text-mutedText">10,454,456 members</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitiesMenu;
