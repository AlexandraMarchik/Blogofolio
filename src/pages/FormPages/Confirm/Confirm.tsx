import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";
import { useDispatch } from "react-redux";

import styles from "./Confirm.module.scss";
import Button from "../../../components/Button";
import { ButtonType } from "../../../utils/@globalTypes";
import { Theme, useThemeContext } from "../../../context/Theme/Context";
import { RoutesList } from "../../Router";
import { activateUser } from "../../../redux/reducers/authSlice";
import FormPages from "../FormPages";

const Confirm = () => {
  const { theme } = useThemeContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { uid, token } = useParams();

  const isDark = theme === Theme.Dark;

  const onConfirmButtonClick = () => {
    if (uid && token) {
      dispatch(
        activateUser({
          data: { uid, token },
          callback: () => navigate(RoutesList.Success),
        })
      );
    }
  };

  return (
    <FormPages title={"Registration Confirmation"}>
      <div
        className={classNames(styles.emailText, {
          [styles.emailTextDark]: isDark,
        })}
      >
        Please activate your account with the activation link in the email.
        Please, check your email
        <div className={styles.button}>
          <Button
            title={"Confirm"}
            onClick={onConfirmButtonClick}
            type={ButtonType.Primary}
          />
        </div>
      </div>
    </FormPages>
  );
};

export default Confirm;
