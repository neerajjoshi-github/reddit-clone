"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "./ui/input";
import { BsCardImage } from "react-icons/bs";
import { TfiWrite } from "react-icons/tfi";
import { BiLink } from "react-icons/bi";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import Image from "next/image";
import { BiLoaderAlt } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { PostType } from "@/store/PostStore";
import useUserStore from "@/store/userStore";
import { usePathname, useRouter } from "next/navigation";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { firestoreDb, storage } from "@/firebase/firebase.config";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title should be between 2 to 50 characters." })
    .max(300, { message: "Title should be between 2 to 300 characters." }),
  text: z
    .string()
    .max(500, { message: "Text cannot be more than 500 characters." })
    .optional(),
  url: z.string().optional(),
});

type CreatePostProps = {
  communityId: string;
};

const CreatePost: React.FC<CreatePostProps> = ({ communityId }) => {
  const { user } = useUserStore();
  const router = useRouter();
  if (!user) router.replace("/");

  const [previewImageUrl, setPreviewImageURl] = useState<string | undefined>(
    undefined
  );
  const [isPreviewImageLoading, setIsPreviewImageLoading] = useState(false);
  const [isFormSubmiting, setIsFormSubmiting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const CustomTabContent = ({
    value,
    children,
  }: {
    value: string;
    children: React.ReactNode;
  }) => {
    return (
      <TabsContent value={value}>
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="relative">
                <Input
                  {...field}
                  placeholder="Title"
                  className="bg-transparent border-borderPrimary focus-visible:border-gray-400"
                />
                <span className="text-xs text-mutedText absolute top-1  right-2">
                  {form.watch("title").length}/300
                </span>
                <FormMessage />
              </FormItem>
            )}
          />

          {children}
        </div>
      </TabsContent>
    );
  };

  const onPreviewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setIsPreviewImageLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (readerEvent) => {
      if (readerEvent?.target?.result) {
        setPreviewImageURl(readerEvent.target.result as string);
      }
    };
    setIsPreviewImageLoading(false);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const newPost: Omit<PostType, "id"> = {
      communityId,
      creatorUsername: user?.username!,
      creatorId: user?.uid!,
      title: values.title,
      URL: values.url || null,
      text: values.text || null,
      createdAt: serverTimestamp() as Timestamp,
      numberOfComments: 0,
      voteStatus: 0,
    };
    setIsFormSubmiting(true);
    try {
      const postDocRef = await addDoc(
        collection(firestoreDb, "posts"),
        newPost
      );

      if (previewImageUrl) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, previewImageUrl, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
      }
      form.reset();
      router.back();
    } catch (error) {
      // TODO handle error
      console.log("Erro while creating a post", error);
    } finally {
      setIsFormSubmiting(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-secondary rounded-md pb-4"
      >
        <Tabs
          defaultValue="text-post"
          className="w-full bg-secondary rounded-md"
        >
          <TabsList className="w-full flex justify-between">
            <TabsTrigger value="text-post">
              <div className="flex gap-2 items-center justify-center">
                <TfiWrite size={18} />
                <p className="font-semibold">Post</p>
              </div>
            </TabsTrigger>
            <TabsTrigger value="image-post" className="p-0">
              <div className="flex w-full h-full gap-2 items-center justify-center border-x-2 border-borderPrimary">
                <BsCardImage size={18} />
                <p className="font-semibold">Image</p>
              </div>
            </TabsTrigger>
            <TabsTrigger value="link-post">
              <div className="flex gap-2 items-center justify-center">
                <BiLink size={22} />
                <p className="font-semibold">Link</p>
              </div>
            </TabsTrigger>
          </TabsList>

          {/* CONTENT */}
          {/* CONTENT */}

          {CustomTabContent({
            value: "text-post",
            children: (
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <Textarea
                      {...field}
                      className="bg-transparent border-borderPrimary focus-visible:border-gray-400"
                      placeholder="Text (optional)"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            ),
          })}
          {CustomTabContent({
            value: "image-post",
            children: (
              <div className="w-full h-60 flex items-center justify-center border-2 border-borderPrimary rounded-md p-2">
                {isPreviewImageLoading ? (
                  <BiLoaderAlt
                    size={24}
                    className="text-primary animate-spin"
                  />
                ) : previewImageUrl ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={previewImageUrl}
                      fill
                      alt="Post Image"
                      className="object-contain"
                    />
                    <div
                      onClick={() => setPreviewImageURl(undefined)}
                      className="absolute right-0 top-0 rounded-full p-1 cursor-pointer hover:bg-slate-700"
                    >
                      <RxCross2 />
                    </div>
                  </div>
                ) : (
                  <Label
                    htmlFor="post-image-file"
                    className="relative w-full h-full flex items-center justify-center  overflow-hidden  rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      Drag and drop images or
                      <span className="flex items-center justify-center cursor-pointer px-4 py-2 rounded-full border border-white hover:bg-slate-600">
                        Upload
                      </span>
                    </div>
                    <Input
                      accept="image/*"
                      id="post-image-file"
                      type="file"
                      className="sr-only"
                      onChange={onPreviewImageChange}
                    />
                  </Label>
                )}
              </div>
            ),
          })}
          {CustomTabContent({
            value: "link-post",
            children: (
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <Textarea
                      {...field}
                      className="bg-transparent border-borderPrimary focus-visible:border-gray-400"
                      placeholder="URL"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            ),
          })}
        </Tabs>

        <div className="flex justify-end mx-4 py-4 border-t border-borderPrimary">
          <Button
            variant="reverse"
            isLoading={isFormSubmiting}
            disabled={isFormSubmiting}
            className="w-[80px]"
          >
            POST
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreatePost;
