"use client";
import usePostsStore, { PostType, PostVote } from "@/store/PostStore";
import { FC, useState } from "react";
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
import { deletePost } from "@/lib/actions/post.actions";
import { toast } from "./ui/use-toast";
import { collection, doc, writeBatch } from "firebase/firestore";
import { firestoreDb } from "@/firebase/firebase.config";
import useUserStore from "@/store/userStore";
import { useRouter } from "next/navigation";

type PostItemProps = {
  post: PostType;
  communityId: string;
};

const PostItem: FC<PostItemProps> = ({ post, communityId }) => {
  const { removePost } = usePostsStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const { postVotes, posts, setPosts, setPostVotes } = usePostsStore();
  const { user } = useUserStore();
  const router = useRouter();
  const userVoteValue = postVotes.find(
    (vote) => vote.postId === post.id
  )?.voteValue;

  const userIsCreator = post.creatorId === user?.uid;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const success = await deletePost(post);
      if (success) {
        removePost(post);
        toast({
          description: "Post deleted successfully!!",
        });
      } else {
        toast({
          description: "Post delete unsuccessful.Please try again!!!!",
        });
      }
    } catch (error) {
      console.log("Error while handle delete", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const onVoteHandler = async (vote: number) => {
    if (!user) return;
    try {
      const { voteStatus } = post;
      const existingVote = postVotes.find((vote) => vote.postId === post.id);

      console.log("EXISTING VOTE  : ", existingVote);
      const batch = writeBatch(firestoreDb);
      const updatedPost = { ...post };
      const updatedPosts = [...posts];
      let updatedPostVotes = [...postVotes];
      let voteChange = vote;

      if (!existingVote) {
        const postVoteRef = doc(
          collection(firestoreDb, "users", `${user.uid}/postVotes`)
        );

        const newVote: PostVote = {
          id: postVoteRef.id,
          postId: post.id,
          communityId,
          voteValue: vote,
        };

        batch.set(postVoteRef, newVote);

        updatedPost.voteStatus = voteStatus + vote;
        updatedPostVotes = [...updatedPostVotes, newVote];
      } else {
        // REMOVING VOTE
        const postVoteRef = doc(
          firestoreDb,
          "users",
          `${user.uid}/postVotes/${existingVote.id}`
        );

        if (existingVote.voteValue === vote) {
          updatedPost.voteStatus = voteStatus - vote;
          updatedPostVotes = updatedPostVotes.filter(
            (vote) => vote.id !== existingVote.id
          );
          batch.delete(postVoteRef);
          voteChange *= -1;
        } else {
          // Filping upvote or downvote

          updatedPost.voteStatus = voteStatus + 2 * vote;
          const voteIndex = updatedPostVotes.findIndex(
            (vote) => vote.id === existingVote.id
          );

          updatedPostVotes[voteIndex] = {
            ...existingVote,
            voteValue: vote,
          };

          batch.update(postVoteRef, {
            voteValue: vote,
          });

          voteChange = 2 * vote;

          console.log("ON ELSE BLOCK COMPLETE UPDATED POST VALUE", updatedPost);
        }
      }
      const postIndex = posts.findIndex((item) => item.id === post.id);
      updatedPosts[postIndex] = updatedPost;
      const postRef = doc(firestoreDb, "posts", post.id);
      batch.update(postRef, { voteStatus: voteStatus + voteChange });

      await batch.commit();

      setPostVotes(updatedPostVotes);
      setPosts(updatedPosts);
    } catch (error) {
      console.log("Error while voting : ", error);
    }
  };

  console.log("POST POST POST POST:", post);
  return (
    <article
      onClick={() => router.push(`/r/${communityId}/comment/${post.id}`)}
      className="w-full flex rounded-md border border-borderPrimary p-2 hover:border-gray-400 cursor-pointer transition duration-300"
    >
      <div className="flex flex-col items-center">
        <Button
          variant="secondary"
          className="group p-0 bg-transparent hover:bg-secondary"
          onClick={() => onVoteHandler(1)}
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
          onClick={() => onVoteHandler(-1)}
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
              isLoading={isDeleting}
              disabled={isDeleting}
              onClick={handleDelete}
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
