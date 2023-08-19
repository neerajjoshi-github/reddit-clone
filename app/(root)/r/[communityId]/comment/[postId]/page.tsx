import PostCommentSection from "@/components/PostCommentSection";
import PostItem from "@/components/PostItem";
import { firestoreDb } from "@/firebase/firebase.config";
import { PostType } from "@/store/PostStore";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import React from "react";

const getPostData = async (postId: string) => {
  const userRef = doc(firestoreDb, "posts", postId);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    console.log("User document data:", docSnap.data());
    return { id: docSnap.id, ...docSnap.data() } as PostType;
  } else {
    return null;
  }
};

const page = async ({
  params,
}: {
  params: { postId: string; communityId: string };
}) => {
  if (!params.postId) return;
  const postData = await getPostData(params.postId);
  return (
    <>
      {postData ? (
        <div className="w-full flex flex-col gap-6">
          <PostItem post={postData} communityId={params.communityId} />
          <PostCommentSection />
        </div>
      ) : (
        <div className="mt-10 w-full flex flex-col items-center justify-center gap-6">
          <Image
            src="/images/reddit-notfound.svg"
            alt="Not Found"
            width={80}
            height={80}
          />
          <p>Post not found!!</p>
        </div>
      )}
    </>
  );
};

export default page;
