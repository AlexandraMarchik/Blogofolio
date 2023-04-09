import React, {useEffect} from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


import PagesContainer from "./PagesContainer";
import Home from "./Home";
import SignIn from "./FormPages/SignIn";
import Success from "./FormPages/Success";
import SignUp from "./FormPages/SignUp";
import Confirm from "./FormPages/Confirm";
import PostPage from "./Post";
import ResetPassword from "./FormPages/ResetPassword";
import NewPassword from "./FormPages/NewPassword";
import {useDispatch, useSelector} from "react-redux";
import {AuthSelectors, getUserInfo} from "../redux/reducers/authSlice";
import {getMyPosts} from "src/redux/reducers/postSlice";
import Search from "src/pages/Search";
import AddPost from "src/pages/AddPost";


export enum RoutesList {
  Home = "/",
  SinglePost = "/blog/:id",
  Search = "/blog/search",
  AddPost = "/blog/add",
  SignIn = "/sign-in",
  SignUp = "/sign-up",
  Confirm = "activate/:uid/:token",
  Success = "/sign-up/success",
  Default = "*",
  ResetPassword = "/sign-in/reset-password",
  NewPassword = '/new-password'
}
const Router = () => {
  const dispatch= useDispatch()
  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserInfo());
      dispatch(getMyPosts())
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.Home} element={<PagesContainer />}>
          <Route path={RoutesList.Home} element={<Home />} />
          <Route
            path={RoutesList.SinglePost}
            element={<PostPage/>}
          />
          <Route path={RoutesList.SignIn} element={<SignIn />} />
          <Route path={RoutesList.Success} element={<Success />} />
          <Route path={RoutesList.SignUp} element={<SignUp />} />
          <Route path={RoutesList.Confirm} element={<Confirm />} />
          <Route path={RoutesList.Search} element={<Search />} />
          <Route path={RoutesList.ResetPassword} element={<ResetPassword />} />
          <Route path={RoutesList.NewPassword} element={<NewPassword />} />
          <Route
            path={RoutesList.AddPost}
            element={
              isLoggedIn ? <AddPost /> : <Navigate to={RoutesList.SignIn} />
            }
          />
          <Route path={RoutesList.Default} element={<div>404 NOT FOUND</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
