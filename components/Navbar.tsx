"use client";
import Image from "next/image";
import { FC } from "react";
import { BsSearch, BsQrCodeScan } from "react-icons/bs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import useGetAppModalStore from "@/store/getAppModalStore";
import useAuthModalStore from "@/store/AuthModalStrore";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const [user, loading, error] = useAuthState(auth);
  const [signOut, signOutLoading, signOutError] = useSignOut(auth);
  console.log(user);
  const getAppModal = useGetAppModalStore();
  const authModal = useAuthModalStore();
  return (
    <div className="z-10 bg-background fixed top-0 left-0 w-full flex px-2 sm:px-6 md:px-10 py-3 items-center justify-between gap-2 border-b border-gray-700">
      <div className="flex lg:hidden rounded-full hover:bg-[#1a282d] p-2 cursor-pointer">
        <GiHamburgerMenu size={24} />
      </div>

      <Link href="/" className="flex">
        <Image
          src="/images/redditFace.svg"
          height={32}
          width={32}
          alt="Reddit Logo"
        />
        <div className="relative w-20 max-lg:hidden">
          <Image
            className="object-cover"
            src="/images/redditText.svg"
            fill
            alt="Reddit Logo"
          />
        </div>
      </Link>

      <div className="flex items-center py-2 px-3 bg-[#1a282d] hover:brightness-110 rounded-full max-w-[750px] flex-1">
        <BsSearch size={18} />
        <Input
          placeholder="Search Reddit"
          className="h-6 bg-transparent border-none"
        />
      </div>
      <div className="flex gap-2">
        <Button
          onClick={getAppModal.toggle}
          variant="secondary"
          className="rounded-full"
        >
          <BsQrCodeScan className="mr-2" size={18} />
          Get App
        </Button>
        {user ? (
          <Button onClick={() => signOut()} className="rounded-full">
            Log Out
          </Button>
        ) : (
          <Button onClick={authModal.toggle} className="rounded-full">
            Log In
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
