import { firestoreDb } from "@/firebase/firebase.config";
import {
  Timestamp,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { CommentType } from "../Post/PostCommentInput";
import { IoMdChatbubbles } from "react-icons/io";
import Comment from "./Comment";

export type fetchCommentType = {
  id: string;
  creatorId: string;
  communityId: string;
  postId: string;
  comment: string;
  postTitle: string;
  creatorUsername: string;
  creatorImageURL: string | null;
  createdAt: Timestamp;
  isParentComment: boolean;
  replies: fetchCommentType[];
};

export type fetchedCommentType = {
  id: string;
  creatorId: string;
  communityId: string;
  postId: string;
  comment: string;
  postTitle: string;
  creatorUsername: string;
  creatorImageURL: string | null;
  createdAt: Timestamp;
  isParentComment: boolean;
  replies: string[];
};

const fetchPostComments = async (
  postId: string
): Promise<fetchCommentType[]> => {
  try {
    const postCommentsQuery = query(
      collection(firestoreDb, "comments"),
      where("postId", "==", postId),
      where("isParentComment", "==", true),
      orderBy("createdAt", "desc")
    );
    const postCommentsDocs = await getDocs(postCommentsQuery);

    const comments: fetchCommentType[] = await Promise.all(
      postCommentsDocs.docs.map(async (doc) => {
        const commentData = doc.data() as fetchedCommentType;
        const comment: fetchCommentType = {
          // @ts-ignore
          id: doc.id,
          ...commentData,
          replies: await fetchReplies(commentData.replies),
        };
        return comment;
      })
    );

    return comments;
  } catch (error) {
    console.log(
      "Error while fetching comments from firebase database: ",
      error
    );
    return [];
  }
};

const fetchReplies = async (
  replyIds: string[]
): Promise<fetchCommentType[]> => {
  const replies: fetchCommentType[] = [];

  for (const replyId of replyIds) {
    const replyCommentsQuery = query(
      collection(firestoreDb, "comments"),
      where("id", "==", replyId),
      orderBy("createdAt", "desc")
    );
    const replyCommentsDocs = await getDocs(replyCommentsQuery);

    if (!replyCommentsDocs.empty) {
      const replyData = replyCommentsDocs.docs[0].data() as fetchedCommentType;
      const reply: fetchCommentType = {
        // @ts-ignore
        id: replyCommentsDocs.docs[0].id,
        ...replyData,
        replies: await fetchReplies(replyData.replies),
      };
      replies.push(reply);
    }
  }

  return replies;
};

type CommentsProps = {
  postId: string;
};

const Comments: React.FC<CommentsProps> = async ({ postId }) => {
  const comments = await fetchPostComments(postId);

  let loading = false;
  return (
    <div className="w-full">
      {loading ? (
        <div></div>
      ) : comments.length === 0 ? (
        <div className="w-full h-80 flex flex-col gap-4 items-center justify-center text-mutedText">
          <IoMdChatbubbles size={40} />
          <p className="font-semibold">No Comments Yet</p>
          <p className="text-sm">Be the first to share what you think!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 px-2">
          {comments.map((comment: any) => {
            return <Comment key={comment.id} comment={comment} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Comments;
