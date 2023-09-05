"use client";
import Image from "next/image";
import { BsSearch, BsQrCodeScan } from "react-icons/bs";
import { Button } from "../ui/button";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import useGetAppModalStore from "@/store/getAppModalStore";
import useAuthModalStore from "@/store/AuthModalStrore";
import { BsBell } from "react-icons/bs";
import { VscAdd } from "react-icons/vsc";
import UserMenu from "./UserMenu";
import useCreateCommunityStore from "@/store/CreateCommunityModalStore";
import useUserStore from "@/store/userStore";
import Search from "./Search";
import useSearchModalStore from "@/store/SearchModal";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const { user } = useUserStore();
  const getAppModal = useGetAppModalStore();
  const authModal = useAuthModalStore();
  const searchModal = useSearchModalStore();
  const router = useRouter();
  let pathname = usePathname();
  if (pathname === "/") pathname = "";

  const onCreatePostClickHandler = () => {
    if (user) {
      router.push(`${pathname}/submit`);
    } else {
      authModal.open();
    }
  };

  return (
    <div className="z-50 bg-background fixed top-0 left-0 w-full flex px-2 sm:px-6 md:px-10 py-3 items-center justify-between gap-2 border-b border-gray-700">
      <div className="flex gap-2 items-center">
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
      </div>

      <div className="max-sm:hidden max-w-[750px] flex-1">
        <Search />
      </div>

      {user ? (
        <div className="flex gap-2">
          <Button
            onClick={searchModal.open}
            variant="secondary"
            className="flex sm:hidden bg-transparent px-2 hover:bg-secondary"
            title="Search"
          >
            <BsSearch size={18} />
          </Button>
          <Button
            onClick={onCreatePostClickHandler}
            variant="secondary"
            className="bg-transparent px-2 hover:bg-secondary"
            title="Create Post"
          >
            <VscAdd size={20} />
          </Button>
          <Button
            variant="secondary"
            className="bg-transparent px-2 hover:bg-secondary"
            title="Notifications"
          >
            <BsBell size={20} />
          </Button>
          <UserMenu user={user} />
        </div>
      ) : (
        <div className="flex gap-2">
          <Button
            onClick={getAppModal.toggle}
            variant="secondary"
            className="rounded-full"
          >
            <BsQrCodeScan className="mr-2" size={18} />
            Get App
          </Button>
          <Button onClick={authModal.toggle} className="rounded-full">
            Log In
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
