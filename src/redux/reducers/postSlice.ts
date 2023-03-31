import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { CardType } from "../../components/Card";

export enum LikeStatus {
  Like = "like",
  Dislike = "disLike",
}
type InitialType = {
  selectedPost: CardType | null;
  isVisibleSelectedModal: boolean;
  likedPosts: CardType[];
  dislikedPosts: CardType[];
  savedPosts: CardType[];
};

const initialState: InitialType = {
  selectedPost: null,
  isVisibleSelectedModal: false,
  likedPosts: [],
  dislikedPosts: [],
  savedPosts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<CardType | null>) => {
      state.selectedPost = action.payload;
    },
    setPostVisibility: (state, action: PayloadAction<boolean>) => {
      state.isVisibleSelectedModal = action.payload;
    },
    setStatus: (
      state,
      action: PayloadAction<{ status: LikeStatus; card: CardType }>
    ) => {
      const { status, card } = action.payload;
      const likedIndex = state.likedPosts.findIndex(
        (post) => post.id === card.id
      );
      const dislikedIndex = state.dislikedPosts.findIndex(
        (post) => post.id === card.id
      );

      const isLike = status === LikeStatus.Like;

      const mainKey = isLike ? "likedPosts" : "dislikedPosts";
      const secondaryKey = isLike ? "dislikedPosts" : "likedPosts";
      const mainIndex = isLike ? likedIndex : dislikedIndex;
      const secondaryIndex = isLike ? dislikedIndex : likedIndex;

      if (mainIndex === -1) {
        state[mainKey].push(card);
      } else {
        state[mainKey].splice(mainIndex, 1);
      }
      if (secondaryIndex > -1) {
        state[secondaryKey].splice(secondaryIndex, 1);
      }
    },
    setSavedPosts: (state, action: PayloadAction<{ card: CardType }>) => {
      const { card } = action.payload;
      const savedPostsIndex = state.savedPosts.findIndex(
        (post) => post.id === card.id
      );
      if (savedPostsIndex === -1) {
        state.savedPosts.push(card);
      } else {
        state.savedPosts.splice(savedPostsIndex, 1);
      }
    },
  },
});

export const { setSelectedPost, setPostVisibility, setStatus, setSavedPosts } =
  postSlice.actions;

export default postSlice.reducer;

export const PostSelectors = {
  getSelectedPost: (state: RootState) => state.posts.selectedPost,
  getVisibleSelectedModal: (state: RootState) =>
    state.posts.isVisibleSelectedModal,
  getLikedPosts: (state: RootState) => state.posts.likedPosts,
  getDislikedPosts: (state: RootState) => state.posts.dislikedPosts,
  getSavedPosts: (state: RootState) => state.posts.savedPosts,
};
