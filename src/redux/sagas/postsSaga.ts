import { ApiResponse } from "apisauce";
import { takeLatest, all, call, put } from "redux-saga/effects";

import API from "../api";
import {
  getAllPosts,
  getMyPosts,
  getSinglePost,
  setAllPosts, setMyPosts,
  setSinglePost,
} from "../reducers/postSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { AllPostsResponse } from "./@types";
import { CardType } from "src/utils/@globalTypes";
import callCheckingAuth from "src/redux/sagas/callCheckingAuth";

function* getAllPostsWorker() {
  const { ok, data, problem }: ApiResponse<AllPostsResponse> = yield call(
    API.getPosts
  );
  if (ok && data) {
    yield put(setAllPosts(data.results));
  } else {
    console.warn("Error getting all posts", problem);
  }
}

function* getSinglePostWorker(action: PayloadAction<string>) {
  const { ok, data, problem }: ApiResponse<CardType> = yield call(
    API.getSinglePost,
    action.payload
  );
  if (ok && data) {
    yield put(setSinglePost(data));
  } else {
    console.warn("Error getting single post", problem);
  }
}

function* getMyPostsWorker() {
  const { ok, data, problem }: ApiResponse<AllPostsResponse> = yield callCheckingAuth(
    API.getMyPosts
  );
  if (ok && data) {
    yield put(setMyPosts(data.results));
  } else {
    console.warn("Error getting my posts", problem);
  }
}

export default function* postsSaga() {
  yield all([
    takeLatest(getAllPosts, getAllPostsWorker),
    takeLatest(getSinglePost, getSinglePostWorker),
    takeLatest(getMyPosts, getMyPostsWorker),
  ]);
}
