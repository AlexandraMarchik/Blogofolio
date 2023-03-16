import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PagesContainer from "./PagesContainer";
import Home from "./Home";
import SignIn from "./SignIn";
import Success from "./Success";
import SignUp from "./SignUp";
import Confirm from "./Confirm";
import PostPage from "./Post";
import { getSinglePost, PostSelectors } from "../redux/reducers/postSlice";

export enum RoutesList {
  Home = "/",
  SinglePost = "/blog/:id",
  Search = "/blog/search",
  AddPost = "/blog/add",
  SignIn = "/sign-in",
  SignUp = "/sign-up",
  Confirm = "/sign-up/confirm",
  Success = "/sign-up/success",
  Default = "*",
}
const Router = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const isLoggedIn = false;
  const { id } = params;
  const singlePost = useSelector(PostSelectors.getSinglePost);

  useEffect(() => {
    if (id) {
      dispatch(getSinglePost(id));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.Home} element={<PagesContainer />}>
          <Route path={RoutesList.Home} element={<Home />} />
          <Route
            path={RoutesList.SinglePost}
            element={singlePost ? <PostPage post={singlePost} /> : null}
          />
          <Route path={RoutesList.SignIn} element={<SignIn />} />
          <Route path={RoutesList.Success} element={<Success />} />
          <Route path={RoutesList.SignUp} element={<SignUp />} />
          <Route path={RoutesList.Confirm} element={<Confirm />} />
          <Route
            path={RoutesList.AddPost}
            element={
              isLoggedIn ? <Home /> : <Navigate to={RoutesList.SignIn} />
            }
          />
          <Route path={RoutesList.Default} element={<div>404 NOT FOUND</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
