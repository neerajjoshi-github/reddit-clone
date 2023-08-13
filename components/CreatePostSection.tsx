import Image from "next/image";
import React from "react";
import { Input } from "./ui/input";
import { BsImage, BsLink } from "react-icons/bs";
import { Button } from "./ui/button";
import Link from "next/link";

const CreatePostSection = () => {
  return (
    <div className="w-full p-2 bg-secondary flex items-center gap-2 rounded-md border border-borderPrimary">
      <Link href="userProfile" className="rounded-full bg-gray-600 p-1">
        <Image
          src="/images/reddit-profile-image.svg"
          width={24}
          height={24}
          alt="Profile Image"
        />
      </Link>
      <Input placeholder="Create Post" className="flex-1" />
      <Button className="px-1" variant="secondary">
        <BsImage size={24} />
      </Button>
      <Button className="px-1" variant="secondary">
        <BsLink size={24} />
      </Button>
    </div>
  );
};

export default CreatePostSection;
