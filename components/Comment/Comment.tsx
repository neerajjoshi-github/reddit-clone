import Image from "next/image";
import React from "react";
import { CommentType } from "../Post/PostCommentInput";
import moment from "moment";
import ReplyButton from "./ReplyButton";
import { fetchCommentType } from "./Comments";

type CommentProps = {
  comment: fetchCommentType;
};

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="w-full flex gap-2 p-1 -ml-4">
      <div className="relative">
        <div className="w-8 h-8 relative z-[1]">
          <Image
            src="/images/reddit-avatar.png"
            alt="Profile Image"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-[2px] bg-secondary"></span>
      </div>
      <div className="w-full">
        <div className="h-8 flex gap-2 items-center">
          <span className="text-sm">
            {comment.creatorUsername.replace(" ", "").toLocaleLowerCase()}
          </span>
          <span className="text-mutedText text-xs">
            &#9679;{" "}
            {moment(new Date(comment.createdAt.seconds * 1000)).fromNow()}
          </span>
        </div>
        <div className="">
          <p className="text-whitesmoke">{comment.comment}</p>
        </div>
        <ReplyButton
          postId={comment.postId}
          parentId={comment.id}
          postTitle={comment.postTitle}
          communityId={comment.communityId}
        />
        {comment.replies.length !== 0 &&
          comment.replies.map((reply) => {
            return <Comment key={reply.id} comment={reply} />;
          })}
      </div>
    </div>
  );
};

export default Comment;
