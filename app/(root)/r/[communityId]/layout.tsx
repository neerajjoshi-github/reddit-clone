import CommunitySidebar from "@/components/CommunitySidebar";
import SidebarPageLayout from "@/components/SidebarPageLayout";
import { Button } from "@/components/ui/button";
import { firestoreDb } from "@/firebase/firebase.config";
import { Community } from "@/store/communityStore";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import React from "react";

type CommunityLayoutProps = {
  children: React.ReactNode;
  params: { communityId: string };
};

const fetchCommunityData = async (communityId: string) => {
  try {
    const communityDocRef = doc(firestoreDb, "communities", communityId);
    const communityDoc = await getDoc(communityDocRef);
    if (communityDoc.exists()) {
      const community = JSON.parse(
        JSON.stringify({ id: communityId, ...communityDoc.data() })
      ) as Community;

      return community;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

const CommunityLayout = async ({ params, children }: CommunityLayoutProps) => {
  const community = await fetchCommunityData(params.communityId);

  return (
    <>
      {community ? (
        <SidebarPageLayout>
          {children}
          <CommunitySidebar community={community} />
        </SidebarPageLayout>
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
    </>
  );
};

export default CommunityLayout;
