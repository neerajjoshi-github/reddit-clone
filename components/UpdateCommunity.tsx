"use client";
import { Community } from "@/store/communityStore";
import useUserStore from "@/store/userStore";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { firestoreDb, storage } from "@/firebase/firebase.config";
import { useRouter } from "next/navigation";

type UpdateCommunityProps = {
  community: Community;
};

const UpdateCommunity: React.FC<UpdateCommunityProps> = ({ community }) => {
  const { user } = useUserStore();
  const router = useRouter();
  const [previewImageUrl, setPreviewImageURl] = useState<string | undefined>(
    undefined
  );
  const [isPreviewImageLoading, setIsPreviewImageLoading] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);

  if (user?.uid !== community.creatorId) return null;

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

  const onImageSave = async () => {
    setIsImageUploading(true);
    try {
      if (previewImageUrl) {
        const imageRef = ref(storage, `communities/${community.id}/image`);
        await uploadString(imageRef, previewImageUrl, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(firestoreDb, "communities", community.id), {
          imageUrl: downloadURL,
        });
      }
      router.refresh();
    } catch (error) {
      console.log("Error while uploading community profile image ", error);
    } finally {
      setIsImageUploading(false);
    }
  };
  return (
    <div className="bg-black flex flex-col p-2 gap-3 border border-borderPrimary rounded-md">
      <span className="font-semibold">Admin</span>

      {isPreviewImageLoading ? (
        <Skeleton className="w-20 h-20" />
      ) : (
        (previewImageUrl || community.imageUrl) && (
          <div className="relative rounded-full w-20 h-20 mx-auto">
            <Image
              src={previewImageUrl || community.imageUrl || ""}
              fill
              className="rounded-full object-cover"
              alt="Community Profile Image"
            />
          </div>
        )
      )}

      <Label
        htmlFor="community-profile-image"
        className="w-full px-2 py-3 flex items-center justify-center bg-secondary rounded-md hover:bg-slate-700 cursor-pointer transition duration-300"
      >
        {previewImageUrl ? "Change Image" : "Upload Image"}
        <Input
          onChange={onPreviewImageChange}
          id="community-profile-image"
          type="file"
          accept="image/*"
          className="sr-only"
        />
      </Label>
      {previewImageUrl && (
        <Button
          isLoading={isImageUploading}
          disabled={isImageUploading}
          onClick={onImageSave}
        >
          Save
        </Button>
      )}
    </div>
  );
};

export default UpdateCommunity;
