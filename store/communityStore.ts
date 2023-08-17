import { auth, firestoreDb } from "@/firebase/firebase.config";
import { Timestamp, collection, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { create } from "zustand";

export type Community = {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "private";
  isNSFW: boolean;
  createdAt?: Timestamp;
  imageUrl?: string;
};

export type CommunitySnippet = {
  communityId: string;
  isModerator?: boolean;
  imageURl?: string;
};

type CommunityState = {
  comuunitySnippets: CommunitySnippet[];
  setCommunitySnippets: (snippets: CommunitySnippet[]) => void;
  toggleJoinCommunity: (communityData: Community) => void;
  addToCommunitySnippets: (communitySnippet: CommunitySnippet) => void;
  removeFromCommunitySnippets: (communityId: string) => void;
};

const useCommunityStore = create<CommunityState>()((set) => ({
  comuunitySnippets: [],
  setCommunitySnippets: (snippets) =>
    set(() => ({ comuunitySnippets: snippets })),
  toggleJoinCommunity: (communityData) => {},
  addToCommunitySnippets: (communitySnippet) =>
    set((state) => ({
      comuunitySnippets: [...state.comuunitySnippets, communitySnippet],
    })),
  removeFromCommunitySnippets: (communityId) =>
    set((state) => ({
      comuunitySnippets: state.comuunitySnippets.filter(
        (snippet) => snippet.communityId !== communityId
      ),
    })),
}));

export default useCommunityStore;
