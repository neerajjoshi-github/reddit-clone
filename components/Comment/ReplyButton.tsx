"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { BiComment } from "react-icons/bi";
import PostCommentInput from "../Post/PostCommentInput";

type ReplyButtonProps = {
  postId: string;
  communityId: string;
  postTitle: string;
  parentId: string;
};

const ReplyButton: React.FC<ReplyButtonProps> = ({
  postId,
  communityId,
  postTitle,
  parentId,
}) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  return (
    <div className="w-full items-start flex flex-col gap-2">
      <Button
        variant="secondary"
        className="flex items-center gap-1 p-1 h-auto text-mutedText bg-transparent hover:bg-secondary"
        onClick={() => setShowReplyInput(!showReplyInput)}
      >
        <BiComment size={16} />
        <span className="text-xs">Reply</span>
      </Button>

      {showReplyInput && (
        <PostCommentInput
          postId={postId}
          postTitle={postTitle}
          communityId={communityId}
          parentId={parentId}
          funcAfterSubmit={() => setShowReplyInput(false)}
        />
      )}
    </div>
  );
};

export default ReplyButton;
