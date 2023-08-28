import React from "react";
import PostCommentInput from "./PostCommentInput";
import Seprator from "../ui/Seprator";
import { PostType } from "@/store/PostStore";
import Comments from "../Comment/Comments";

type PostCommentSectionProps = {
  post: PostType;
};

const PostCommentSection: React.FC<PostCommentSectionProps> = ({ post }) => {
  return (
    <div className="p-2 rounded-md gap-6 bg-black flex flex-col">
      <PostCommentInput
        postId={post.id}
        communityId={post.communityId!}
        postTitle={post.title}
      />
      <Seprator />
      <Comments postId={post.id} />
    </div>
  );
};

export default PostCommentSection;
