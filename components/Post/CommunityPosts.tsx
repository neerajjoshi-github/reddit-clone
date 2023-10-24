"use client";
import { firestoreDb } from "@/firebase/firebase.config";
import usePostsStore, { PostType } from "@/store/PostStore";
import useCommunityStore, { Community } from "@/store/communityStore";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import PostItem from "./PostItem";
import PostSkeleton from "../LodingSkeleton/PostSkeleton";
import Image from "next/image";
import useUserStore from "@/store/userStore";
import FiltersSection from "../Sections/FiltersSection";

type PostsProps = {
  comuunityData: Community;
};

const CommunityPosts: FC<PostsProps> = ({ comuunityData }) => {
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const { setPosts, posts } = usePostsStore();
  const [selectedFilter, setSelectedFilter] = useState("createdAt");
  const getPosts = async () => {
    try {
      const postQuery = query(
        collection(firestoreDb, "posts"),
        where("communityId", "==", comuunityData.id),
        orderBy(selectedFilter, "desc")
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setPosts(posts as PostType[]);
    } catch (error) {
      console.log("Error while fetching posts in community ", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getPosts();
  }, [selectedFilter]);

  console.log("HELLLO HELLLO HELLO HELLO : :: :: :: : :", { selectedFilter });

  return (
    <>
      <FiltersSection
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      {isLoading ? (
        <>
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : posts.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center mt-8">
          <Image
            src="/images/reddit-full-body.png"
            width={80}
            height={80}
            alt="Reddit Icon"
          />
          <p>
            <span className="font-semibold">r/{comuunityData.id}</span> does not
            have any post.
          </p>
        </div>
      ) : (
        posts.map((post) => <PostItem key={post.id} post={post} />)
      )}
    </>
  );
};

export default CommunityPosts;
