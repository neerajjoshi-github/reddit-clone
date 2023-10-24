"use client";
import { firestoreDb } from "@/firebase/firebase.config";
import usePostsStore, { PostType } from "@/store/PostStore";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import PostSkeleton from "../LodingSkeleton/PostSkeleton";
import FiltersSection from "../Sections/FiltersSection";

const HomePosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { setPosts, posts } = usePostsStore();
  const [selectedFilter, setSelectedFilter] = useState("title");

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const postsRef = collection(firestoreDb, "posts");
      const q = query(postsRef, orderBy(selectedFilter, "desc"));
      const postSnapshot = await getDocs(q);
      const posts = postSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      const postsData = JSON.parse(JSON.stringify(posts)) as PostType[];
      setPosts(postsData);
    } catch (error) {
      console.log("Error while getting post for home page", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedFilter]);

  return (
    <>
      <FiltersSection
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      {isLoading || !posts ? (
        <>
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : (
        posts.map((post) => <PostItem key={post.id} post={post} />)
      )}
    </>
  );
};

export default HomePosts;
