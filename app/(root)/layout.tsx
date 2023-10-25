import SideNavBar from "@/components/Header/SideNavBar";
import Navbar from "@/components/Header/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
import UserDataProvider from "@/providers/UserData-Provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserDataProvider>
      <Toaster />
      <Navbar />
      <div className="flex justify-center">
        <div className="flex w-[1350px] max-w-[1350px]">
          <SideNavBar className="sticky top-[64px] right-0 max-xl:hidden" />
          <div className="pt-[64px] flex-1">{children}</div>
        </div>
      </div>
    </UserDataProvider>
  );
}
