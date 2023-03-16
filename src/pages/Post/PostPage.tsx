import React, { FC, useEffect } from "react";
import styles from "./PostPage.module.scss";
import { BookmarkIcon, DislikeIcon, LikeIcon } from "../../assets/icons";
import classNames from "classnames";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import { CardType } from "../../utils/@globalTypes";

type PostProps = {
  post: CardType;
};

const PostPage: FC<PostProps> = ({ post }) => {
  const { title, text, image, id } = post;
  const { theme } = useThemeContext();

  return (
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
          <div className={styles.post}> Post {id} </div>
        </div>
        <div className={styles.pageContent}>
          <div
            className={classNames(styles.title, {
              [styles.darkTitle]: theme === Theme.Dark,
            })}
          >
            {title}
          </div>
          <img src={image} className={styles.image}></img>
          <div
            className={classNames(styles.text, {
              [styles.darkText]: theme === Theme.Dark,
            })}
          >
            {text}
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
  );
};

export default PostPage;
