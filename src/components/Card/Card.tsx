import React, { FC, useState } from "react";
import classNames from "classnames";
import styles from "./Card.module.scss";
import { CardProps, CardSize } from "./types";
import {
  BookmarkIcon,
  DislikeIcon,
  LikeIcon,
  MoreIcon, SavedBookmarkIcon,
} from "../../assets/icons";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import { useDispatch, useSelector } from "react-redux";
import {
  LikeStatus,
  PostSelectors,
  setPostVisibility, setSavedPosts,
  setSelectedPost,
  setStatus,
} from "../../redux/reducers/postSlice";

const Card: FC<CardProps> = ({ card, size }) => {
  const { title, text, date, image } = card;
  const dispatch = useDispatch();
  const { theme } = useThemeContext();

  const isVisible = useSelector(PostSelectors.getVisibleSelectedModal);
  const isMedium = size === CardSize.Medium;
  const isSmall = size === CardSize.Small;
  const isDark = theme === Theme.Dark;
  const likedPosts = useSelector(PostSelectors.getLikedPosts);
  const dislikedPosts = useSelector(PostSelectors.getDislikedPosts);
  const likedIndex = likedPosts.findIndex((post) => post.id === card.id);
  const dislikedIndex = dislikedPosts.findIndex((post) => post.id === card.id);
  const savedPosts = useSelector(PostSelectors.getSavedPosts)
  const savedPostsIndex = savedPosts.findIndex((post) => post.id === card.id);

  const onClickMore = () => {
    dispatch(setSelectedPost(card));
    dispatch(setPostVisibility(true));
  };
  const onStatusClick = (status: LikeStatus) => () => {
    dispatch(setStatus({ status, card }));
  };
  const onClickBookmark = () => {
    dispatch(setSavedPosts({card}));
  };

  return (
    <div
      className={classNames(styles.container, {
        [styles.mediumContainer]: isMedium,
        [styles.smallContainer]: isSmall,
        [styles.darkContainer]: isDark,
      })}
    >
      <div
        className={classNames(styles.infoContainer, {
          [styles.mediumInfoContainer]: isMedium,
          [styles.smallInfoContainer]: isSmall,
        })}
      >
        <div className={styles.mainInfoContainer}>
          <div className={styles.titleContainer}>
            <div className={styles.date}>{date}</div>
            <div
              className={classNames(styles.title, {
                [styles.mediumTitle]: isMedium || isSmall,
                [styles.darkTitle]: isDark,
              })}
            >
              {title}
            </div>
          </div>
          {size === CardSize.large && <div className={styles.text}>{text}</div>}
        </div>
        <img
          src={image}
          className={classNames(styles.image, {
            [styles.mediumImage]: isMedium,
            [styles.smallImage]: isSmall,
          })}
        />
      </div>
      <div className={styles.footer}>
        <div
          className={classNames(styles.iconContainer, {
            [styles.darkIconContainer]: isDark,
          })}
        >
          <div
            onClick={onStatusClick(LikeStatus.Like)}
            className={styles.statusContainer}
          >
            <LikeIcon />
            <div className={styles.status}>{likedIndex > -1 && 1}</div>
          </div>
          <div
            onClick={onStatusClick(LikeStatus.Dislike)}
            className={styles.statusContainer}
          >
            <DislikeIcon />
            <div className={styles.status}>{dislikedIndex > -1 && 1}</div>
          </div>
        </div>
        <div
          className={classNames(styles.iconContainer, {
            [styles.darkIconContainer]: isDark,
          })}
        >
          <div onClick={onClickBookmark} >
            {savedPostsIndex > -1 ? <SavedBookmarkIcon/>: <BookmarkIcon /> }
          </div>
          {!isVisible && (
            <div onClick={onClickMore}>
              <MoreIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
