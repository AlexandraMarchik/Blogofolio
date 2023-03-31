import React, { useState } from "react";
import classNames from "classnames";

import FormPages from "../FormPages";
import styles from "./ResetPassword.module.scss";
import Button from "../../../components/Button";
import { ButtonType } from "../../../utils/@globalTypes";
import { Theme, useThemeContext } from "../../../context/Theme/Context";
import Input from "../../../components/Input";

const ResetPassword = () => {
  const { theme } = useThemeContext();
  const isDark = theme === Theme.Dark;

  const [email, setEmail] = useState("");

  const onChangeEmail = (value: string) => {
    setEmail(value);
  };

  return (
    <FormPages title={"Reset password"}>
      <div
        className={classNames(styles.Text, {
          [styles.TextDark]: isDark,
        })}
      >
        You will receive an email example@gmail.com with a link to reset your
        password!
        <div
          className={styles.inputContainer}
        >
          <Input
            value={email}
            onChange={onChangeEmail}
            type={"text"}
            title="Email"
            placeholder="Your email"
          />
        </div>
        <div className={styles.button}>
          <Button
            title={"Go to home"}
            onClick={() => {}}
            type={ButtonType.Primary}
          />
        </div>
      </div>
    </FormPages>
  );
};

export default ResetPassword;
