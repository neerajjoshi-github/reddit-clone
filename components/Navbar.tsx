import Image from "next/image";
import { FC } from "react";
import { BsSearch, BsQrCodeScan } from "react-icons/bs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <div className="fixed top-0 left-0 w-full flex px-10 py-3 items-center justify-between gap-2 border-b border-gray-700">
      <div className="flex">
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
      </div>
      <div className="flex items-center py-2 px-3 bg-[#1a282d] hover:brightness-110 rounded-full max-w-[750px] flex-1">
        <BsSearch size={18} />
        <Input
          placeholder="Search Reddit"
          className="h-6 bg-transparent border-none focus:border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger>
            <Button variant="secondary" className="rounded-full">
              <BsQrCodeScan className="mr-2" size={18} />
              Get App
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0f1a1c] py-14">
            <DialogHeader>
              <DialogTitle className="text-4xl font-bold">
                Get the Reddit app
              </DialogTitle>
              <DialogDescription>
                <div className="w-full h-full flex flex-col items-center justify-center mt-4 gap-4">
                  <p className="text-white font-semibold">
                    Scan this QR code to download the app now
                  </p>
                  <div className="w-40 h-40 border-2 border-white relative">
                    <Image
                      src="/images/reddit-qr-code.svg"
                      alt="Qr Code"
                      fill
                    />
                  </div>
                  <p className="text-white font-semibold">
                    Or check it out in the app stores
                  </p>
                  <div className="flex gap-2">
                    <Link href="#" className="relative w-32 h-10">
                      <Image src="/images/app-store.svg" alt="Apple" fill />
                    </Link>
                    <Link href="#" className="relative w-32 h-10">
                      <Image src="/images/google-play.svg" alt="Apple" fill />
                    </Link>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Button>Login</Button>
      </div>
    </div>
  );
};

export default Navbar;
