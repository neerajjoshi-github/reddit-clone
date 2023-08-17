"use client";
import SideNavBar from "@/components/SideNavBar";
import Navbar from "@/components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestoreDb } from "@/firebase/firebase.config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import useCommunityStore, { CommunitySnippet } from "@/store/communityStore";
import { useEffect } from "react";
import { BiLoader } from "react-icons/bi";
import useUserStore, { User } from "@/store/userStore";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading, error] = useAuthState(auth);
  const communityStore = useCommunityStore();
  const userStore = useUserStore();

  const handleAuthChange = async () => {
    console.log("RUNNING INSIDE AUTH HANDLE CHANGE");
    if (user) {
      console.log("USER EXIST", user.uid);
      try {
        const snippetDocs = await getDocs(
          collection(firestoreDb, `users/${user.uid}/communitySnippets`)
        );
        const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
        communityStore.setCommunitySnippets(snippets as CommunitySnippet[]);

        // User from firestore
        const userRef = doc(firestoreDb, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          console.log("User document data:", docSnap.data());
          const userData = {
            uid: user.uid,
            ...docSnap.data(),
          };
          userStore.setUser(userData as User);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("USER DOES NOT EXIST");
      // When user logout remove the user and community snippets from state
      communityStore.setCommunitySnippets([]);
      userStore.setUser(null);
    }
  };

  useEffect(() => {
    console.log("HELLO RUNNING INSIDE THE USE EFFECT");
    handleAuthChange();
  }, [user]);

  return !loading ? (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="flex w-[1350px] max-w-[1350px]">
          <SideNavBar className="sticky top-[64px] right-0 max-xl:hidden" />
          <div className="pt-[64px] w-full">{children}</div>
        </div>
      </div>
    </>
  ) : (
    <div className="w-full h-screen flex items-center justify-center">
      <BiLoader className="text-primary animate-spin" size={40} />
    </div>
  );
}
