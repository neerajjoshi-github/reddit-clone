"use client";
import { FC, useState } from "react";
import { Button } from "./ui/button";
import useCommunityStore, {
  Community,
  CommunitySnippet,
} from "@/store/communityStore";
import { doc, increment, writeBatch } from "firebase/firestore";
import { firestoreDb } from "@/firebase/firebase.config";
import useUserStore from "@/store/userStore";
import useAuthModalStore from "@/store/AuthModalStrore";

type JoinButtonProps = {
  className?: string;
  community: Community;
  isBlue?: boolean;
};

const JoinButton: FC<JoinButtonProps> = ({
  className,
  community,
  isBlue = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    comuunitySnippets,
    addToCommunitySnippets,
    removeFromCommunitySnippets,
  } = useCommunityStore();
  const isJoined = !!comuunitySnippets.find(
    (snippet) => snippet.communityId === community.id
  );
  const user = useUserStore().user;
  const authModal = useAuthModalStore();

  const onClickHandler = async () => {
    if (!user) return authModal.open();

    setIsLoading(true);

    try {
      const batch = writeBatch(firestoreDb);
      const communitySnippetsDocRef = doc(
        firestoreDb,
        `users/${user?.uid}/communitySnippets`,
        community.id
      );
      const communityDocRef = doc(firestoreDb, "communities", community.id);
      if (!isJoined) {
        const newSnippet: CommunitySnippet = {
          communityId: community.id,
          imageURl: community.imageUrl || "",
          isModerator: false,
        };
        batch.set(communitySnippetsDocRef, newSnippet);

        batch.update(communityDocRef, {
          numberOfMembers: increment(1),
        });

        await batch.commit();
        addToCommunitySnippets(newSnippet);
      } else {
        batch.delete(communitySnippetsDocRef);
        batch.update(communityDocRef, {
          numberOfMembers: increment(-1),
        });
        await batch.commit();
        removeFromCommunitySnippets(community.id);
      }
    } catch (error) {
      console.log("Join button onClick handler error : ", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      isLoading={isLoading}
      disabled={isLoading}
      onClick={onClickHandler}
      className={`group min-w-[120px] ${className} ${
        isBlue &&
        (isJoined
          ? "border-[3px] border-blue-600 text-blue-600 font-semibold !bg-white"
          : "bg-blue-600 hover:bg-blue-500 font-semibold text-white")
      }`}
      variant={isJoined ? "outline" : "reverse"}
    >
      {isJoined ? (
        <p>
          <span
            className={`${
              isBlue ? "text-black " : "text-white"
            } group-hover:flex hidden`}
          >
            Leave
          </span>
          <span className="group-hover:hidden flex">Joined</span>
        </p>
      ) : (
        "JOIN"
      )}
    </Button>
  );
};

export default JoinButton;
