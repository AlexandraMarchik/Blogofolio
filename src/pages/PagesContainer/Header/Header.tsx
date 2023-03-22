import React, { useMemo, useState } from "react";
import styles from "./Header.module.scss";
import MenuBurger from "../../../components/MenuBurger";
import User from "../../../components/User";
import ThemeSwitcher from "../../../components/ThemeSwitcher";
import Button from "../../../components/Button";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { RoutesList } from "../../Router";
import classNames from "classnames";
import { UserIcon } from "../../../assets/icons";
import { ButtonType } from "../../../utils/@globalTypes";

const Header = () => {
  const [isOpened, setOpened] = useState(false);
  const onButtonClick = () => {
    return setOpened(!isOpened);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn =false;

  const onAuthButtonClick = () => {
    navigate(RoutesList.SignIn);
  };
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

  return (
    <>
      <div className={styles.container}>
        <div className={styles.btnBurger}>
          <MenuBurger isOpened={isOpened} onButtonClick={onButtonClick} />
        </div>
        <div className={styles.userName}>
          {isLoggedIn ? <User userName={"Artem Malkin"} /> : <UserIcon />}
        </div>
      </div>
      {isOpened && (
        <div className={styles.menuContainer}>
          <div className={styles.actionsContainer}>
            {isLoggedIn && (
              <div className={styles.userNameMenu}>
                <User userName={"Artem Malkin"} />
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
              onClick={onAuthButtonClick}
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
