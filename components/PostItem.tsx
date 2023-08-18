import { PostType } from "@/store/PostStore";
import { FC } from "react";
import {
  BiUpvote,
  BiDownvote,
  BiSolidUpvote,
  BiSolidDownvote,
  BiComment,
} from "react-icons/bi";
import { LuShare } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "./ui/button";
import Seprator from "./Seprator";
import moment from "moment";
import Image from "next/image";

type PostItemProps = {
  post: PostType;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: () => void;
  onDelete: () => void;
  onSelectPost: () => void;
};

const PostItem: FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDelete,
  onSelectPost,
}) => {
  return (
    <article className="w-full flex rounded-md border border-borderPrimary p-2 hover:border-gray-400 cursor-pointer transition duration-300">
      <div className="flex flex-col items-center">
        <Button
          variant="secondary"
          className="group p-0 bg-transparent hover:bg-secondary"
        >
          {userVoteValue === 1 ? (
            <BiSolidUpvote className="text-red-500" size={24} />
          ) : (
            <BiUpvote
              size={24}
              className="text-mutedText group-hover:text-red-500"
            />
          )}
        </Button>
        <span
          className={`${userVoteValue === 1 && "text-red-500"} ${
            userVoteValue === -1 && "text-blue-500"
          } text-whitesmoke text-sm`}
        >
          {post.voteStatus}
        </span>
        <Button
          variant="secondary"
          className="group p-0 bg-transparent hover:bg-secondary"
        >
          {userVoteValue === -1 ? (
            <BiSolidDownvote className="text-blue-500" size={24} />
          ) : (
            <BiDownvote
              size={24}
              className="text-mutedText group-hover:text-blue-500"
            />
          )}
        </Button>
      </div>
      <div className="flex-1 flex flex-col gap-2 py-2 px-4">
        <div className="text-xs text-mutedText">
          Posted by u/
          {post.creatorUsername.replace(" ", "").toLocaleLowerCase()}{" "}
          {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
        </div>
        <Seprator />
        <div className="font-bold text-lg">{post.title}</div>
        {post.text && <p className="text-sm">{post.text}</p>}
        {post.imageURL && (
          <div className="relative max-h-[512px]">
            <Image
              src={post.imageURL}
              alt="Post Image"
              sizes="100vw"
              className="w-full h-auto max-h-[512px] object-contain"
              width={500}
              height={300}
            />
          </div>
        )}
        <Seprator />
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            className="flex items-center gap-1 rounded-full"
          >
            <BiComment size={20} />
            <span className="text-sm text-whitesmoke">
              {post.numberOfComments}
            </span>
          </Button>
          <Button
            variant="secondary"
            className="flex items-center gap-1 rounded-full"
          >
            <LuShare size={20} />
            <span className="text-sm text-whitesmoke">Share</span>
          </Button>
          {userIsCreator && (
            <Button
              variant="secondary"
              className="group flex items-center gap-1 rounded-full"
            >
              <AiOutlineDelete
                className="group-hover:text-red-600 transition duration-300"
                size={20}
              />
              <span className="text-sm text-whitesmoke group-hover:text-red-600 transition duration-300">
                Delete
              </span>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};

export default PostItem;
