"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestoreDb } from "@/firebase/firebase.config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import useCommunityStore, { CommunitySnippet } from "@/store/communityStore";
import React, { useEffect, useState } from "react";
import useUserStore, { User } from "@/store/userStore";
import usePostsStore, { PostVote } from "@/store/PostStore";
import Image from "next/image";

type UserDataProviderProps = {
  children: React.ReactNode;
};

const UserDataProvider: React.FC<UserDataProviderProps> = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(true);
  const { setCommunitySnippets } = useCommunityStore();
  const { setUser } = useUserStore();
  const { setPostVotes } = usePostsStore();

  const handleAuthChange = async () => {
    if (user) {
      try {
        // User from firestore
        const userRef = doc(firestoreDb, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = {
            uid: user.uid,
            ...docSnap.data(),
          };
          setUser(userData as User);
        }
        // Community Snippets
        const snippetDocs = await getDocs(
          collection(firestoreDb, `users/${user.uid}/communitySnippets`)
        );
        const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
        setCommunitySnippets(snippets as CommunitySnippet[]);

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
      setCommunitySnippets([]);
      setPostVotes([]);
      setUser(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleAuthChange();
  }, [user]);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
          <div className="relative">
            <div className="relative w-20 h-20">
              <Image
                src="/images/redditFace.svg"
                fill
                alt="Reddit Logo Image"
                className="z-[10] "
              />
            </div>
            <div className="z-[1] absolute top-0 left-0 animate-ping  bg-primary h-20 w-20 rounded-full"></div>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default UserDataProvider;
