import React, { FC} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import styles from "./Card.module.scss";
import { CardProps } from "./types";
import {
  BookmarkIcon,
  DislikeIcon,
  LikeIcon,
  MoreIcon,
  SavedBookmarkIcon,
} from "src/assets/icons";
import { Theme, useThemeContext } from "src/context/Theme/Context";
import {
  LikeStatus,
  PostSelectors,
  setPostVisibility,
  setSavedPosts,
  setSelectedPost,
  setStatus,
} from "src/redux/reducers/postSlice";
import { CardSize } from "src/utils/@globalTypes";
import { AuthSelectors } from "src/redux/reducers/authSlice";


const Card: FC<CardProps> = ({ card, size }) => {
  const { title, text, date, image, id } = card;
  const dispatch = useDispatch();
  const { theme } = useThemeContext();
  const navigate = useNavigate();

  const isMedium = size === CardSize.Medium;
  const isSmall = size === CardSize.Small;
  const isSearch = size === CardSize.Search;
  const isDark = theme === Theme.Dark;

  const isVisible = useSelector(PostSelectors.getVisibleSelectedModal);
  const likedPosts = useSelector(PostSelectors.getLikedPosts);
  const dislikedPosts = useSelector(PostSelectors.getDislikedPosts);
  const likedIndex = likedPosts.findIndex((post) => post.id === card.id);
  const dislikedIndex = dislikedPosts.findIndex((post) => post.id === card.id);
  const savedPosts = useSelector(PostSelectors.getSavedPosts);
  const savedPostsIndex = savedPosts.findIndex((post) => post.id === card.id);
  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);

  const onClickMore = () => {
    dispatch(setSelectedPost(card));
    dispatch(setPostVisibility(true));
  };
  const onStatusClick = (status: LikeStatus) => () => {
    dispatch(setStatus({ status, card }));
  };
  const onClickBookmark = () => {
    dispatch(setSavedPosts(card));
  };

  const onTitleClick = () => {
    navigate(`/blog/${id}`);
  };

  return (
    <div
      className={classNames(styles.container, {
        [styles.mediumContainer]: isMedium,
        [styles.smallContainer]: isSmall,
        [styles.searchContainer]: isSearch,
        [styles.darkContainer]: isDark,
      })}
    >
      <div
        className={classNames(styles.infoContainer, {
          [styles.mediumInfoContainer]: isMedium,
          [styles.smallInfoContainer]: isSmall,
          [styles.searchInfoContainer]: isSearch,
        })}
      >
        <div className={styles.mainInfoContainer}>
          <div className={styles.titleContainer}>
            <div className={styles.date}>{date}</div>
            <div
              className={classNames(styles.title, {
                [styles.mediumTitle]: isMedium || isSmall || isSearch,
                [styles.darkTitle]: isDark,
              })}
              onClick={onTitleClick}
            >
              {title}
            </div>
          </div>
          {size === CardSize.Large && <div className={styles.text}>{text}</div>}
        </div>
        <img
          src={image}
          className={classNames(styles.image, {
            [styles.mediumImage]: isMedium,
            [styles.smallImage]: isSmall || isSearch,
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
          {isLoggedIn && (
            <div onClick={onClickBookmark}>
              {savedPostsIndex > -1 ? <SavedBookmarkIcon /> : <BookmarkIcon />}
            </div>
          )}
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
