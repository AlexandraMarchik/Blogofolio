import React, { FC, useEffect } from "react";
import styles from "./PostPage.module.scss";
import { BookmarkIcon, DislikeIcon, LikeIcon } from "../../assets/icons";
import classNames from "classnames";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getSinglePost, PostSelectors} from "../../redux/reducers/postSlice";

const PostPage= () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const singlePost = useSelector(PostSelectors.getSinglePost);

  useEffect(() => {
    if (id) {
      dispatch(getSinglePost(id));
    }
  }, []);


  const { theme } = useThemeContext();

  return singlePost ? (
    <div>
      <div className={styles.container}>
        <div className={styles.dreadCrumbs}>
          <div
            className={classNames(styles.home, {
              [styles.darkHome]: theme === Theme.Dark,
            })}
          >
            Home
          </div>
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
            <div className={styles.iconLike}>
              <LikeIcon />
            </div>
            <div className={styles.iconDisLike}>
              <DislikeIcon />
            </div>
          </div>
          <div>
            <div className={styles.iconBookMark}>
              <BookmarkIcon /> Add to favorites
            </div>
          </div>
        </div>
      </div>
    </div>
  ): null;
};

export default PostPage;
