"use client";
import { firestoreDb } from "@/firebase/firebase.config";
import usePostsStore, { PostType } from "@/store/PostStore";
import { Community } from "@/store/communityStore";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import PostItem from "./PostItem";
import PostSkeleton from "./PostSkeleton";

type PostsProps = {
  comuunityData: Community;
};

const Posts: FC<PostsProps> = ({ comuunityData }) => {
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
      const posts = postDocs.docs.map((doc) => doc.data());
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
        <div>
          <p>
            <span className="font-semibold">r/{comuunityData.id}</span> does not
            have any post.
          </p>
        </div>
      ) : (
        posts.map((post) => (
          <PostItem
            post={post}
            userIsCreator
            onDelete={() => {}}
            onSelectPost={() => {}}
            onVote={() => {}}
          />
        ))
      )}
    </>
  );
};

export default Posts;
