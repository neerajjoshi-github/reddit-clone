import React from "react";
import { fetchCommentType } from "./Comments";
import moment from "moment";

type DetailCommentProps = {
  comment: fetchCommentType;
};

const DetailComment: React.FC<DetailCommentProps> = ({ comment }) => {
  return (
    <div className="w-full border border-borderPrimary">
      <div className="w-full border-b border-borderPrimary p-2">
        <p className="text-mutedText text-xs">
          <span className="text-white">
            {comment.creatorUsername.replace(" ", "").toLocaleLowerCase()}
          </span>{" "}
          commented on{" "}
          <span className="text-white">
            {comment.postTitle.length > 30
              ? comment.postTitle.slice(0, 30) + "..."
              : comment.postTitle}
          </span>{" "}
          <span className="text-mutedText text-xs">
            &#9679;{" "}
            {moment(new Date(comment.createdAt.seconds * 1000)).fromNow()}
          </span>
        </p>
      </div>
      <div className="relative w-full flex gap-2 p-2">
        <p className="text-whitesmoke text-sm">{comment.comment}</p>
      </div>
    </div>
  );
};

export default DetailComment;
