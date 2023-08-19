import { firestoreDb } from "@/firebase/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import useCommunityStore, { Community } from "@/store/communityStore";
import CreatePostSection from "@/components/CreatePostSection";
import FiltersSection from "@/components/FiltersSection";
import CommunityHeader from "@/components/CommunityHeader";
import Posts from "@/components/Posts";

const fetchCommunityData = async (communityId: string) => {
  try {
    const communityDocRef = doc(firestoreDb, "communities", communityId);
    const communityDoc = await getDoc(communityDocRef);
    if (communityDoc.exists()) {
      const community = JSON.parse(
        JSON.stringify({ id: communityId, ...communityDoc.data() })
      ) as Community;
      useCommunityStore.setState({ currentCommunity: community });
      useCommunityStore.setState({
        recentlyVisitedCommunities: [
          ...useCommunityStore.getState().recentlyVisitedCommunities,
          { id: community.id, imageUrl: community.imageUrl },
        ],
      });
      return community;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

const page = async ({ params }: { params: { communityId: string } }) => {
  const community = await fetchCommunityData(params.communityId);
  const recent = useCommunityStore.getState().recentlyVisitedCommunities;
  console.log("RECENTLY VISITED COMMUNITIES FROM STORE : ", recent);

  return (
    <>
      {community && (
        <main className="flex gap-4 p-4">
          <div className="flex-1 flex flex-col gap-4 overflow-auto">
            <CommunityHeader community={community} />
            <CreatePostSection />
            <FiltersSection />
            <Posts comuunityData={community} data-superjson />
          </div>
        </main>
      )}
    </>
  );
};

export default page;
