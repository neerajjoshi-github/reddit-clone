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

type PostsProps = {
  comuunityData: Community;
};

const Posts: FC<PostsProps> = ({ comuunityData }) => {
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const { setPosts, posts } = usePostsStore();
  const getPosts = async () => {
    try {
      const postQuery = query(
        collection(firestoreDb, "posts"),
        where("communityId", "==", comuunityData.id),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      console.log("POSTS IN GETPOSTS", posts);
      setPosts(posts as PostType[]);
    } catch (error) {
      console.log("Error while fetching posts ", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
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
        posts.map((post) => <PostItem post={post} />)
      )}
    </>
  );
};

export default Posts;
