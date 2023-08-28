import SidebarPageLayout from "@/components/Layout/SidebarPageLayout";
import UserSidebar from "@/components/Sidebars/UserSidebar";
import { Button } from "@/components/ui/button";
import { firestoreDb } from "@/firebase/firebase.config";
import { Community } from "@/store/communityStore";
import { User } from "@/store/userStore";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type UserLayoutProps = {
  children: React.ReactNode;
  params: { userId: string };
};

const fetchUserData = async (userId: string) => {
  try {
    const userDocRef = doc(firestoreDb, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const user = JSON.parse(
        JSON.stringify({ uid: userId, ...userDoc.data() })
      ) as User;
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

const UserLayout = async ({ params, children }: UserLayoutProps) => {
  const user = await fetchUserData(params.userId);

  return (
    <>
      {user ? (
        <SidebarPageLayout>
          {children}
          <UserSidebar user={user} />
        </SidebarPageLayout>
      ) : (
        <div className="flex w-full h-[calc(100dvh-64px)] items-center justify-center">
          <div className="flex flex-col items-center gap-6 p-2 text-center">
            <Image
              src="/images/confused-reddit.png"
              width={100}
              height={100}
              alt="Not Found"
            />
            <p className="text-base font-semibold">
              Sorry, nobody on Reddit goes by that name.
            </p>
            <p className="text-sm">
              The person may have been banned or the username is incorrect.
            </p>

            <Link href="/" className="w-full">
              <Button variant="reverse" className="w-full">
                GO HOME
              </Button>
            </Link>

            <p className="text-xs max-w-[480px] text-mutedText">
              Use of this site constitutes acceptance of our User Agreement and
              Privacy Policy. Reddit, Inc. © 2023. All rights reserved. REDDIT
              and the ALIEN Logo are registered trademarks of reddit inc.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default UserLayout;
