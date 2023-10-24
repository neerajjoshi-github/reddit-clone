import { Timestamp } from "firebase/firestore";
import { create } from "zustand";

export type PostType = {
  id: string;
  communityId: string | null;
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
  voteValue: number;
};

type PostState = {
  currentPost: PostType | null;
  posts: PostType[];
  postVotes: PostVote[];
  setPosts: (posts: PostType[]) => void;
  removePost: (post: PostType) => void;
  setPostVotes: (postVotes: PostVote[]) => void;
  setCurrentPost: (post: PostType) => void;
};

const usePostsStore = create<PostState>()((set) => ({
  currentPost: null,
  setCurrentPost: (post) => set(() => ({ currentPost: post })),
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
