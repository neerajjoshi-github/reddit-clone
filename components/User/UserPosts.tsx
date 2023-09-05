import { firestoreDb } from "@/firebase/firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import PostItem from "../Post/PostItem";
import { PostType } from "@/store/PostStore";

const fetchUserPosts = async (userId: string) => {
  try {
    const postsRef = collection(firestoreDb, "posts");
    const q = query(postsRef, where("creatorId", "==", userId));
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => {
      return doc.data();
    });
    return JSON.parse(JSON.stringify(posts)) as PostType[];
  } catch (error) {
    console.log("Error while getting user posts : ", error);
  }
};

type UserPostsProps = {
  userId: string;
};

const UserPosts = async ({ userId }: UserPostsProps) => {
  const posts = await fetchUserPosts(userId);
  return (
    <div className="w-full flex flex-col gap-4">
      {posts?.length === 0 ? (
        <div className="w-full mt-20 flex items-center justify-center">
          hmm... user hasn't posted anything
        </div>
      ) : (
        posts?.map((post) => <PostItem key={post.id} post={post} />)
      )}
    </div>
  );
};

export default UserPosts;
