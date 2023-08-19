import React from "react";
import PostCommentInput from "./PostCommentInput";
import Seprator from "./Seprator";

const PostCommentSection = () => {
  return (
    <div className="p-2 rounded-md gap-6 bg-black">
      <PostCommentInput />
      <Seprator />
    </div>
  );
};

export default PostCommentSection;
