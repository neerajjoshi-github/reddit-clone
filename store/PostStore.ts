import { Timestamp } from "firebase/firestore";
import { create } from "zustand";

export type PostType = {
  id: string;
  communityId: string;
  creatorId: string;
  creatorUsername: string;
  title: string;
  text?: string | null;
  numberOfComments: number;
  voteStatus: number;
  imageURL?: string | null;
  communityProfileImageURL?: string | null;
  URL?: string | null;
  createdAt: Timestamp;
};

type PostState = {
  selectedPost: PostType | null;
  posts: PostType[];
  setPosts: (posts: PostType[]) => void;
};

const usePostsStore = create<PostState>()((set) => ({
  selectedPost: null,
  posts: [],
  setPosts: (posts) => set(() => ({ posts: posts })),
}));

export default usePostsStore;
