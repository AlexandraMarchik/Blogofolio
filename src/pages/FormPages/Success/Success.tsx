import React from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import styles from "./Success.module.scss";
import Button from "../../../components/Button";
import { ButtonType } from "../../../utils/@globalTypes";
import { Theme, useThemeContext } from "../../../context/Theme/Context";
import { RoutesList } from "../../Router";
import FormPages from "../index";

const Success = () => {
  const { theme } = useThemeContext();
  const navigate = useNavigate();

  const isDark = theme === Theme.Dark;

  const onGoHomeButtonClick = () => {
    navigate(RoutesList.Home);
  };

  return (
    <FormPages title={"Success"}>
      <div
        className={classNames(styles.emailText, {
          [styles.emailTextDark]: isDark,
        })}
      >
        <div>Email confirmed.</div>
        Your registration is now completed
        <div className={styles.button}>
          <Button
            title={"Go to home"}
            onClick={onGoHomeButtonClick}
            type={ButtonType.Primary}
          />
        </div>
      </div>
    </FormPages>
  );
};

export default Success;
