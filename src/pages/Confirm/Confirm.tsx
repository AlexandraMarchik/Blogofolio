import React from "react";
import styles from "./Confirm.module.scss";
import Title from "../../components/Title";
import classNames from "classnames";
import Button from "../../components/Button";
import { ButtonType } from "../../utils/@globalTypes";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import {NavLink, useNavigate} from "react-router-dom";
import {RoutesList} from "../Router";

const Confirm = () => {
  const { theme } = useThemeContext();
  const isDark = theme === Theme.Dark;
  const navigate = useNavigate();
    const onHomeButtonClick = () => {
        navigate(RoutesList.Home);
    };

  return (
    <div>
      <div
        className={classNames(styles.container, {
          [styles.containerDark]: isDark,
        })}
      >
        <NavLink to={RoutesList.Home}
          className={classNames(styles.backHome, {
            [styles.backHomeDark]: isDark,
          })}
        >
          Back to home
        </NavLink>
        <div className={classNames(styles.title)}>
          <Title title={"Registration Confirmation"} />
        </div>
        <div className={styles.wrapper}>
          <div
            className={classNames(styles.emailText, {
              [styles.emailTextDark]: isDark,
            })}
          >
            {" "}
            Please activate your account with the activation link in the email
            example@gmail.com. Please, check your email
            <div className={styles.button}>
              <Button
                title={"Go to home"}
                onClick={onHomeButtonClick}
                type={ButtonType.Primary}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
