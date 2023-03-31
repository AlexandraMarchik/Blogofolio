import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import {
  ActivateUserPayload,
  SignInUserPayload,
  SignUpUserPayload,
} from "./@types";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";
import { UserInfoResponse } from "../sagas/@types";

type InitialType = {
  isLoggedIn: boolean;
  userInfo: UserInfoResponse | null;
};
const initialState: InitialType = {
  isLoggedIn: !!localStorage.getItem(ACCESS_TOKEN_KEY),
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUpUser: (_, __: PayloadAction<SignUpUserPayload>) => {},
    activateUser: (_, __: PayloadAction<ActivateUserPayload>) => {},
    signInUser: (_, __: PayloadAction<SignInUserPayload>) => {},
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    logoutUser: (_, __: PayloadAction<undefined>) => {},
    userInfo: (_, __: PayloadAction<undefined>) => {},
    setUserInfo: (state, action: PayloadAction<UserInfoResponse | null>) => {
      state.userInfo = action.payload;
    },
  },
});

export const {
  signUpUser,
  activateUser,
  signInUser,
  setLoggedIn,
  logoutUser,
  userInfo,
  setUserInfo,
} = authSlice.actions;

export default authSlice.reducer;

export const AuthSelectors = {
  getLoggedIn: (state: RootState) => state.auth.isLoggedIn,
  getUserInfo: (state: RootState) => state.auth.userInfo,
};
