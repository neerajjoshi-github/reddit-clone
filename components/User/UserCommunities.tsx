import { firestoreDb } from "@/firebase/firebase.config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React from "react";
import { Community } from "@/store/communityStore";
import Image from "next/image";
import Link from "next/link";

const fetchCommunity = async (communityId: string) => {
  try {
    const communityRef = doc(firestoreDb, "communities", communityId);
    const docSnap = await getDoc(communityRef);
    if (docSnap.exists()) {
      return docSnap.data() as Community;
    } else {
      return {};
    }
  } catch (error) {
    console.log("Error while getting community data", error);
  }
};

const fetchUserCommunities = async (userId: string) => {
  try {
    const snippetDocs = await getDocs(
      collection(firestoreDb, `users/${userId}/communitySnippets`)
    );

    const communities = await Promise.all(
      snippetDocs.docs.map(async (doc) => {
        return (await fetchCommunity(doc.data().communityId)) as Community;
      })
    );
    return JSON.parse(JSON.stringify(communities)) as Community[];
  } catch (error) {
    console.log("Error while getting user posts : ", error);
  }
};

type UserCommnetsProps = {
  userId: string;
};

const UserCommunities = async ({ userId }: UserCommnetsProps) => {
  const communities = await fetchUserCommunities(userId);
  return (
    <div className="w-full flex flex-col gap-4">
      {communities?.length !== 0 ? (
        communities?.map((community) => (
          <div className="flex items-center gap-2 hover:bg-secondary cursor-pointer px-2 py-2 rounded-md">
            <div className="relative w-16 h-16 rounded-full">
              <Image
                src={community.imageUrl || "/images/redditPersonalHome.png"}
                fill
                alt="Community Profile Image"
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <Link
                className="hover:underline hover:underline-offset-2"
                href={`/r/${community.name}`}
              >
                r/{community.name}
              </Link>
              <p className="text-sm text-mutedText">
                {community.numberOfMembers} members
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full mt-20 flex items-center justify-center">
          hmm... user has no joined or created communities.
        </div>
      )}
    </div>
  );
};

export default UserCommunities;
