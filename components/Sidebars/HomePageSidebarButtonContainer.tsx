"use client";
import React from "react";
import { Button } from "../ui/button";
import useCreateCommunityStore from "@/store/CreateCommunityModalStore";
import { useRouter } from "next/navigation";

const HomePageSidebarButtonContainer = () => {
  const router = useRouter();
  const createCommunityModal = useCreateCommunityStore();
  return (
    <div className="m-2 border-t border-borderPrimary flex flex-col gap-2 py-3">
      <Button variant="reverse" onClick={() => router.push("/submit")}>
        Create Post
      </Button>
      <Button
        onClick={createCommunityModal.open}
        variant="outline"
        className="font-bold border-2"
      >
        Create Community
      </Button>
    </div>
  );
};

export default HomePageSidebarButtonContainer;
