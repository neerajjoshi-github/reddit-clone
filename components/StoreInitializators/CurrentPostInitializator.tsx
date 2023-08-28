"use client";
import usePostsStore, { PostType } from "@/store/PostStore";
import React from "react";

type CurrentPostInitializatorProps = {
  post: PostType;
};

const CurrentPostInitializator: React.FC<CurrentPostInitializatorProps> = ({
  post,
}) => {
  const { setCurrentPost } = usePostsStore();
  setCurrentPost(post);

  return null;
};

export default CurrentPostInitializator;
