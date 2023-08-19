import { firestoreDb, storage } from "@/firebase/firebase.config";
import { Timestamp, deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
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

export type PostVote = {
  id: string;
  postId: string;
  communityId: string;
  voteValue: number;
};

type PostState = {
  selectedPost: PostType | null;
  posts: PostType[];
  setPosts: (posts: PostType[]) => void;
  removePost: (post: PostType) => void;
  postVotes: PostVote[];
  setPostVotes: (postVotes: PostVote[]) => void;
};

const usePostsStore = create<PostState>()((set) => ({
  selectedPost: null,
  posts: [],
  setPosts: (posts) => set(() => ({ posts: posts })),
  removePost: (deletePost) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== deletePost.id),
    })),
  postVotes: [],
  setPostVotes: (postVotes) =>
    set(() => ({
      postVotes: postVotes,
    })),
}));

export default usePostsStore;
