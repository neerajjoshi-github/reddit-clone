import { Timestamp } from "firebase/firestore";
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

export type RecentlyVisitedCommunity = {
  id: string;
  imageUrl?: string;
};

type CommunityState = {
  comuunitySnippets: CommunitySnippet[];
  setCommunitySnippets: (snippets: CommunitySnippet[]) => void;
  addToCommunitySnippets: (communitySnippet: CommunitySnippet) => void;
  removeFromCommunitySnippets: (communityId: string) => void;
  currentCommunity: Community | null;
  setCurrentCommunity: (communityData: Community) => void;
  recentlyVisitedCommunities: RecentlyVisitedCommunity[];
};

const useCommunityStore = create<CommunityState>()((set) => ({
  comuunitySnippets: [],
  setCommunitySnippets: (snippets) =>
    set(() => ({ comuunitySnippets: snippets })),
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
  currentCommunity: null,
  setCurrentCommunity: (communityData) =>
    set(() => ({ currentCommunity: communityData })),
  recentlyVisitedCommunities: [],
}));

export default useCommunityStore;
