import React, { useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";

import styles from "./Header.module.scss";
import MenuBurger from "../../../components/MenuBurger";
import User from "../../../components/User";
import ThemeSwitcher from "../../../components/ThemeSwitcher";
import Button from "../../../components/Button";
import { RoutesList } from "../../Router";
import { UserIcon } from "../../../assets/icons";
import { ButtonType } from "../../../utils/@globalTypes";
import { useDispatch, useSelector } from "react-redux";
import { AuthSelectors, logoutUser } from "../../../redux/reducers/authSlice";

const Header = () => {
  const [isOpened, setOpened] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);
  const userInfo = useSelector(AuthSelectors.getUserInfo);


  const navButtonsList = useMemo(
    () => [
      {
        title: "Home",
        key: RoutesList.Home,
      },
      ...(!isLoggedIn
        ? []
        : [
            {
              title: "Add Post",
              key: RoutesList.AddPost,
            },
          ]),
    ],
    [isLoggedIn]
  );
  const onButtonClick = () => {
    return setOpened(!isOpened);
  };
  const onAuthButtonClick = () => {
    navigate(RoutesList.SignIn);
  };
  const onLogoutClick = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.btnBurger}>
          <MenuBurger isOpened={isOpened} onButtonClick={onButtonClick} />
        </div>
        <div className={styles.userName} onClick={onAuthButtonClick}>
          {isLoggedIn && userInfo ? (
            <User userName={userInfo?.username} />
          ) : (
            <UserIcon />
          )}
        </div>
      </div>
      {isOpened && (
        <div className={styles.menuContainer}>
          <div className={styles.actionsContainer}>
            {isLoggedIn && (
              <div className={styles.userNameMenu}>
                {userInfo ? <User userName={userInfo?.username} /> : null}
              </div>
            )}
            <div>
              {navButtonsList.map(({ key, title }) => {
                return (
                  <NavLink
                    to={key}
                    key={key}
                    className={classNames(styles.navButton, {
                      [styles.activeNavButton]: location.pathname === key,
                    })}
                  >
                    {title}
                  </NavLink>
                );
              })}
            </div>
          </div>
          <div>
            <ThemeSwitcher />
            <Button
              title={isLoggedIn ? "Log out" : "Sign In"}
              onClick={isLoggedIn ? onLogoutClick : onAuthButtonClick}
              type={ButtonType.Secondary}
              className={styles.authButton}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
