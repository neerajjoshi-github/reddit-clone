"use client";
import SideNavBar from "@/components/Header/SideNavBar";
import Navbar from "@/components/Header/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestoreDb } from "@/firebase/firebase.config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import useCommunityStore, { CommunitySnippet } from "@/store/communityStore";
import { useEffect } from "react";
import useUserStore, { User } from "@/store/userStore";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
import usePostsStore, { PostVote } from "@/store/PostStore";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading, error] = useAuthState(auth);
  const communityStore = useCommunityStore();
  const userStore = useUserStore();
  const { setPostVotes } = usePostsStore();

  const handleAuthChange = async () => {
    console.log("RUNNING INSIDE AUTH HANDLE CHANGE");
    if (user) {
      console.log("USER EXIST", user.uid);
      try {
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
        // Community Snippets
        const snippetDocs = await getDocs(
          collection(firestoreDb, `users/${user.uid}/communitySnippets`)
        );
        const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
        communityStore.setCommunitySnippets(snippets as CommunitySnippet[]);

        // Vote snippets
        const votesDocs = await getDocs(
          collection(firestoreDb, `users/${user.uid}/postVotes`)
        );
        const votesSnippets = votesDocs.docs.map((doc) => ({
          ...doc.data(),
        }));
        setPostVotes(votesSnippets as PostVote[]);
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
    handleAuthChange();
    console.log("USER FROM AUTH CHANGE", user);
  }, [user]);

  return !loading ? (
    <>
      <Toaster />
      <Navbar />
      <div className="flex justify-center">
        <div className="flex w-[1350px] max-w-[1350px]">
          <SideNavBar className="sticky top-[64px] right-0 max-xl:hidden" />
          <div className="pt-[64px] flex-1">{children}</div>
        </div>
      </div>
    </>
  ) : (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="relative w-20 h-20">
          <Image
            src="/images/redditFace.svg"
            fill
            alt="Reddit Logo Image"
            className="z-[10] animate-pulse"
          />
        </div>
        <div className="z-[1] absolute top-0 left-0 animate-ping  bg-primary h-20 w-20 rounded-full"></div>
      </div>
    </div>
  );
}
