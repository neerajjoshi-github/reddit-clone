import { Button } from "@/components/ui/button";
import { firestoreDb } from "@/firebase/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import Link from "next/link";
import useCommunityStore, { Community } from "@/store/communityStore";
import CreatePostSection from "@/components/CreatePostSection";
import FiltersSection from "@/components/FiltersSection";
import CommunityHeader from "@/components/CommunityHeader";
import Image from "next/image";
import Seprator from "@/components/Seprator";
import { PiCakeDuotone } from "react-icons/pi";
import { formatTimestamp } from "@/lib/utils";
import JoinButton from "@/components/JoinButton";
import Posts from "@/components/Posts";

const fetchCommunityData = async (communityId: string) => {
  try {
    const communityDocRef = doc(firestoreDb, "communities", communityId);
    const communityDoc = await getDoc(communityDocRef);
    if (communityDoc.exists()) {
      return { id: communityId, ...communityDoc.data() } as Community;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

const page = async ({ params }: { params: { communityId: string } }) => {
  const community = await fetchCommunityData(params.communityId);

  return (
    <div className="">
      {community ? (
        <main className="flex gap-4 p-4">
          <div className="flex-1 flex flex-col gap-4 overflow-auto">
            <CommunityHeader community={community} />
            <CreatePostSection />
            <FiltersSection />
            {/* POST SECTION */}
            <Posts comuunityData={community} />
          </div>
          <div className="max-lg:hidden relative min-w-[300px] max-w-[300px] p-2  flex flex-col gap-4">
            <div className="sticky top-[72px] left-0 bg-[#04090a] w-full  rounded-lg">
              <div className="relative h-24">
                <Image
                  fill
                  src="/images/recCommsArt.png"
                  alt="Community Cover Image"
                  className="rounded-t-lg object-cover"
                />
              </div>
              <div className="px-2 py-4 flex flex-col gap-4">
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
                    <p className="text-sm text-whitesmoke font-semibold">
                      Top 1%
                    </p>
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
          </div>
        </main>
      ) : (
        <div className="flex w-full h-[calc(100dvh-64px)] items-center justify-center">
          <div className="flex flex-col items-center gap-6 p-2 text-center">
            <div className="w-20 h-20 bg-gray-400 rounded-full"></div>
            <p className="text-base font-semibold">
              Sorry, there aren’t any communities on Reddit with that name.
            </p>
            <p className="text-sm">
              This community may have been banned or the community name is
              incorrect.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline">Create community</Button>
              <Link href="/">
                <Button variant="reverse">GO HOME</Button>
              </Link>
            </div>
            <p className="text-xs max-w-[480px] text-mutedText">
              Use of this site constitutes acceptance of our User Agreement and
              Privacy Policy. Reddit, Inc. © 2023. All rights reserved. REDDIT
              and the ALIEN Logo are registered trademarks of reddit inc.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
