import { firestoreDb } from "@/firebase/firebase.config";
import { Community } from "@/store/communityStore";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Image from "next/image";
import React from "react";
import HomePageSidebarButtonContainer from "./HomePageSidebarButtonContainer";
import Link from "next/link";

const fetchPopularCommunities = async () => {
  try {
    const communityRef = collection(firestoreDb, "communities");
    const q = query(
      communityRef,
      orderBy("numberOfMembers", "desc"),
      limit(10)
    );

    const querySnapshot = await getDocs(q);
    const popularCommunities = querySnapshot.docs.map((doc) => {
      return doc.data();
    });
    return popularCommunities as Community[];
  } catch (error) {
    console.log("Error while getting popular communities : ", error);
  }
};

const HomePageSidebar = async () => {
  const popularCommunities = await fetchPopularCommunities();

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
        <HomePageSidebarButtonContainer />
      </div>
      <div className="sticky top-[72px] left-0 bg-[#04090a] w-full border border-borderPrimary rounded-md px-2 py-4">
        <h3 className="text-sm font-bold">POPULAR COMMUNITIES</h3>
        <div className="px-2 mt-4">
          {popularCommunities &&
            popularCommunities.map((community) => {
              return (
                <Link
                  href={`/r/${community.name}`}
                  className="flex items-center gap-2 hover:bg-secondary cursor-pointer px-2 py-2 rounded-md"
                >
                  <div className="relative w-8 h-8 rounded-full">
                    <Image
                      src={
                        community.imageUrl || "/images/redditPersonalHome.png"
                      }
                      fill
                      alt="Community Profile Image"
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-sm">r/{community.name}</h4>
                    <p className="text-xs text-mutedText">
                      {community.numberOfMembers} members
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default HomePageSidebar;
