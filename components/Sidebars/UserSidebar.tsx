"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { BsFlower3 } from "react-icons/bs";
import { PiCakeFill } from "react-icons/pi";
import useUserStore, { User } from "@/store/userStore";
import moment from "moment";

type UserSidebarProps = {
  user: User;
};

const UserSidebar: React.FC<UserSidebarProps> = ({ user }) => {
  const { user: currentUser } = useUserStore();

  return (
    <div className="sticky top-[80px] right-0 bg-black flex flex-col w-full rounded-md pb-4">
      <div className="relative">
        <div className="bg-secondary h-32 w-full rounded-t-md"></div>
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
          <Image
            src="/images/avatar-profile.png"
            width={120}
            height={120}
            alt="Avatar  Image"
          />
        </div>
      </div>
      <div className="flex flex-col mt-8 items-center w-full px-2">
        <span className="text-2xl font-semibold">{user.username}</span>
        <div>
          <span className="text-mutedText text-sm">
            u/{user.username.toLowerCase().replace(" ", "")}
          </span>
        </div>

        {currentUser?.uid === user.uid && (
          <Button className="bg-gradient-to-r from-red-600 to-orange-600 w-full rounded-full font-semibold h-auto">
            Add Image
          </Button>
        )}
        <div className="my-3 flex w-full border-t border-borderPrimary pt-2">
          <div className="flex flex-col gap-2 flex-1">
            <span className="text-sm">Karma</span>
            <div className="flex gap-1 items-center">
              <BsFlower3 className="text-blue-400" />
              <span className="text-xs text-mutedText">1</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <span className="text-sm">Cake Day</span>
            <div className="flex gap-1 items-center">
              <PiCakeFill className="text-blue-400" />
              <span className="text-xs text-mutedText">
                {moment(new Date(user.createdAt)).format("DD/MM/YYYY")}
              </span>
            </div>
          </div>
        </div>

        {currentUser?.uid === user.uid && (
          <Button variant="reverse" className="w-full">
            New Post
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserSidebar;
