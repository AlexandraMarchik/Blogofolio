import React, {useEffect } from "react";
import {NavLink, useParams} from "react-router-dom";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";

import styles from "./PostPage.module.scss";
import {BookmarkIcon, DislikeIcon, LikeIcon, SavedBookmarkIcon} from "../../assets/icons";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import {getSinglePost, LikeStatus, PostSelectors, setSavedPosts, setStatus} from "../../redux/reducers/postSlice";
import {RoutesList} from "../Router";


const PostPage= () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const singlePost = useSelector(PostSelectors.getSinglePost);

  const { theme } = useThemeContext();
  const likedPosts = useSelector(PostSelectors.getLikedPosts);
  const dislikedPosts = useSelector(PostSelectors.getDislikedPosts);
  const likedIndex = likedPosts.findIndex((post) => post.id === singlePost?.id);
  const dislikedIndex = dislikedPosts.findIndex((post) => post.id === singlePost?.id);
  const savedPosts = useSelector(PostSelectors.getSavedPosts)
  const savedPostsIndex = savedPosts.findIndex((post) => post.id === singlePost?.id);

    // не уверена правильно ли кинула action (конкретно эта запись смущает card: singlePost)
    const onStatusClick = (status: LikeStatus) => () => {
    if(singlePost) {
      dispatch(setStatus({status, card: singlePost}));
    }
  };

  const onClickBookmark = () => {
    if(singlePost) {
      dispatch(setSavedPosts(singlePost));
    }
  };


  useEffect(() => {
    if (id) {
      dispatch(getSinglePost(id));
    }
  }, []);



  return singlePost ? (
    <div>
      <div className={styles.container}>
        <div className={styles.dreadCrumbs}>
          <NavLink to={RoutesList.Home}
            className={classNames(styles.home, {
              [styles.darkHome]: theme === Theme.Dark,
            })}
          >
            Home
          </NavLink>
          <div className={styles.symbolSl}>|</div>
          <div className={styles.post}> Post {singlePost?.id} </div>
        </div>
        <div className={styles.pageContent}>
          <div
            className={classNames(styles.title, {
              [styles.darkTitle]: theme === Theme.Dark,
            })}
          >
            {singlePost?.title}
          </div>
          <img src={singlePost?.image} className={styles.image}></img>
          <div
            className={classNames(styles.text, {
              [styles.darkText]: theme === Theme.Dark,
            })}
          >
            {singlePost?.text}
          </div>
        </div>
        <div className={styles.icons}>
          <div className={styles.iconsLike}>
            <div className={styles.iconLike} onClick={onStatusClick(LikeStatus.Like)}>
              <LikeIcon /> <div className={styles.status}>{likedIndex > -1 && 1}</div>
            </div>
            <div className={styles.iconDisLike}  onClick={onStatusClick(LikeStatus.Dislike)}>
              <DislikeIcon /> <div className={styles.status}>{dislikedIndex > -1 && 1}</div>
            </div>
          </div>
          <div>
            <div className={styles.iconBookMark} onClick={ onClickBookmark}>
              {savedPostsIndex > -1 ? <SavedBookmarkIcon/>: <BookmarkIcon /> } Add to favorites
            </div>
          </div>
        </div>
      </div>
    </div>
  ): null;
};

export default PostPage;
