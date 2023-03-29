import { ApiResponse } from "apisauce";
import { takeLatest, all, call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import API from "../api";
import {
  activateUser,
  getUserInfo,
  logoutUser,
  setLoggedIn,
  setUserInfo,
  signInUser,
  signUpUser,
} from "../reducers/authSlice";
import {
  ActivateUserPayload,
  SignInUserPayload,
  SignUpUserPayload,
} from "../reducers/@types";
import { SignInResponse, SignUpUserResponse, UserInfoResponse } from "./@types";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../../utils/constants";
import callCheckingAuth from "./callCheckingAuth";

function* signUpUserWorker(action: PayloadAction<SignUpUserPayload>) {
  const { data, callback } = action.payload;
  const { ok, problem }: ApiResponse<SignUpUserResponse> = yield call(
    API.signUpUser,
    data
  );
  if (ok) {
    callback();
  } else {
    console.warn("Error sign up user", problem);
  }
}

function* activateUserWorker(action: PayloadAction<ActivateUserPayload>) {
  const { data, callback } = action.payload;
  const { ok, problem }: ApiResponse<undefined> = yield call(
    API.activateUser,
    data
  );
  if (ok) {
    callback();
  } else {
    console.warn("Error activate user", problem);
  }
}

function* signInUserWorker(action: PayloadAction<SignInUserPayload>) {
  const { data, callback } = action.payload;
  const {
    ok,
    problem,
    data: responseData,
  }: ApiResponse<SignInResponse> = yield call(API.signInUser, data);
  if (ok && responseData) {
    localStorage.setItem(ACCESS_TOKEN_KEY, responseData?.access);
    localStorage.setItem(REFRESH_TOKEN_KEY, responseData?.refresh);
    yield put(setLoggedIn(true));
    callback();
  } else {
    console.warn("Error activate user", problem);
  }
}


function* getUserInfoWorker() {
  const { ok, problem, data }: ApiResponse<UserInfoResponse> =
      yield callCheckingAuth(API.getUserInfo);
  if (ok && data) {
    yield put(setUserInfo(data));
  } else {
    console.warn("Error getting user info ", problem);
  }
}

function* logoutUserWorker() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  yield put(setLoggedIn(false));
  yield put(setUserInfo(null));
}

export default function* authSaga() {
  yield all([
    takeLatest(signUpUser, signUpUserWorker),
    takeLatest(activateUser, activateUserWorker),
    takeLatest(signInUser, signInUserWorker),
    takeLatest(logoutUser, logoutUserWorker),
    takeLatest(getUserInfo, getUserInfoWorker),
  ]);
}
