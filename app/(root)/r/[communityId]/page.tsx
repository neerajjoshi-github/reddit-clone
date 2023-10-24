import { firestoreDb } from "@/firebase/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import useCommunityStore, { Community } from "@/store/communityStore";
import CreatePostSection from "@/components/Sections/CreatePostSection";
import FiltersSection from "@/components/Sections/FiltersSection";
import CommunityHeader from "@/components/Community/CommunityHeader";
import CommunityPosts from "@/components/Post/CommunityPosts";

const fetchCommunityData = async (communityId: string) => {
  console.log("Hello fetch is runing in community page hula la");
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

  return (
    <>
      {community && (
        <main className="flex gap-4 p-4">
          <div className="flex-1 flex flex-col gap-4 overflow-auto">
            <CommunityHeader community={community} />
            <CreatePostSection />
            <CommunityPosts comuunityData={community} data-superjson />
          </div>
        </main>
      )}
    </>
  );
};

export default page;
