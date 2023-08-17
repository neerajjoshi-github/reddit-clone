import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import Image from "next/image";
import { BsChevronDown } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase.config";
import { User } from "@/store/userStore";

type UserMenuProps = {
  user: User;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [signOut, loading, error] = useSignOut(auth);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="outline"
          className="rounded-md p-1 gap-2 border-gray-600"
        >
          <div className="rounded-md bg-gray-500 p-[2px]">
            <Image
              src="/images/reddit-profile-image.svg"
              width={18}
              height={18}
              alt="Profile Image"
            />
          </div>
          <div className="max-md:hidden">
            <p className="text-xs">{user.username || user.email}</p>
          </div>
          <BsChevronDown size={22} className="px-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[250px]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          <div className="flex items-center gap-2">
            <BiLogOut size={22} />
            <span>Logout</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
