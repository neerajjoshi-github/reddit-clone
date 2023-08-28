"use client";
import React from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Timestamp,
  arrayUnion,
  collection,
  doc,
  increment,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { firestoreDb } from "@/firebase/firebase.config";
import useUserStore from "@/store/userStore";
import { useRouter } from "next/navigation";

const commentFormSchema = z.object({
  comment: z
    .string()
    .min(1, { message: "Comment can be between 1 to 500 characters" })
    .max(500, { message: "Comment can be between 1 to 500 characters" }),
});

type PostCommentInputProps = {
  postId: string;
  communityId: string;
  postTitle: string;
  parentId?: string;
  funcAfterSubmit?: () => void;
};

export type CommentType = {
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
  replies: [];
};

const PostCommentInput: React.FC<PostCommentInputProps> = ({
  postId,
  communityId,
  postTitle,
  parentId,
  funcAfterSubmit,
}) => {
  const { user } = useUserStore();
  const router = useRouter();
  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onCommentSubmit = async (values: z.infer<typeof commentFormSchema>) => {
    console.log("Comment Form Submit", values);
    if (!user) return;
    try {
      const batch = writeBatch(firestoreDb);
      const commentDocRef = doc(collection(firestoreDb, "comments"));

      const newComment: CommentType = {
        id: commentDocRef.id,
        comment: values.comment,
        postId,
        postTitle,
        communityId,
        creatorId: user.uid,
        creatorUsername: user.username,
        creatorImageURL: user.profileImage,
        createdAt: serverTimestamp() as Timestamp,
        isParentComment: parentId ? false : true,
        replies: [],
      };

      batch.set(commentDocRef, newComment);

      const postDocRef = doc(firestoreDb, "posts", postId);

      batch.update(postDocRef, {
        numberOfComments: increment(1),
      });

      if (parentId) {
        const parentCommentDocRef = doc(firestoreDb, "comments", parentId);
        batch.update(parentCommentDocRef, {
          replies: arrayUnion(commentDocRef.id),
        });
      }

      await batch.commit();

      form.reset();
      router.refresh();

      if (funcAfterSubmit) {
        funcAfterSubmit();
      }
    } catch (error) {
      console.log("Error while creating a comment : ", error);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onCommentSubmit)}
        className="w-full flex flex-col p-2"
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div>
                  <Textarea
                    className="peer rounded-none bg-transparent border-b-0 border-borderPrimary focus-visible:border-gray-400"
                    rows={6}
                    placeholder="What are your thoughts?"
                    {...field}
                  />
                  <div className="peer-focus:border-gray-400 bg-secondary flex justify-end p-2 border-x border-b border-borderPrimary">
                    <Button
                      disabled={
                        !form.formState.isValid || form.formState.isSubmitting
                      }
                      isLoading={form.formState.isSubmitting}
                      variant="reverse"
                    >
                      Comment
                    </Button>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default PostCommentInput;
