import { firestoreDb } from "@/firebase/firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { CommentType } from "../Post/PostCommentInput";
import Comment from "../Comment/Comment";
import DetailComment from "../Comment/DetailComment";

const fetchUserCommnets = async (userId: string) => {
  try {
    const commentsRef = collection(firestoreDb, "comments");
    const q = query(commentsRef, where("creatorId", "==", userId));
    const querySnapshot = await getDocs(q);
    const comments = querySnapshot.docs.map((doc) => {
      return doc.data();
    });
    return JSON.parse(JSON.stringify(comments)) as CommentType[];
  } catch (error) {
    console.log("Error while getting user posts : ", error);
  }
};

type UserCommnetsProps = {
  userId: string;
};

const UserComments = async ({ userId }: UserCommnetsProps) => {
  const comments = await fetchUserCommnets(userId);
  return (
    <div className="w-full flex flex-col gap-4">
      {comments?.length === 0 ? (
        <div className="w-full mt-20 flex items-center justify-center">
          hmm... user hasn't commented on anything
        </div>
      ) : (
        comments?.map((comment) => <DetailComment comment={comment} />)
      )}
    </div>
  );
};

export default UserComments;
