import React from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const PostCommentInput = () => {
  return (
    <div className="w-full flex flex-col p-2">
      <Textarea
        className="peer rounded-none bg-transparent border-b-0 border-borderPrimary focus-visible:border-gray-400"
        rows={10}
        placeholder="What are your thoughts?"
      />
      <div className="peer-focus:border-gray-400 bg-secondary flex justify-end p-2 border-x border-b border-borderPrimary">
        <Button variant="reverse">Comment</Button>
      </div>
    </div>
  );
};

export default PostCommentInput;
