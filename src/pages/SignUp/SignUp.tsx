import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import Title from "../../components/Title";
import Input from "../../components/Input";
import classNames from "classnames";
import Button from "../../components/Button";
import { ButtonType } from "../../utils/@globalTypes";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import { NavLink } from "react-router-dom";
import { RoutesList } from "../Router";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onChangeEmail = (value: string) => {
    setEmail(value);
  };
  const onChangePassword = (value: string) => {
    setPassword(value);
  };
  const onChangeName = (value: string) => {
    setName(value);
  };
  const onChangeConfirmPassword = (value: string) => {
    setConfirmPassword(value);
  };

  const { theme } = useThemeContext();
  const isDark = theme === Theme.Dark;

  return (
    <div>
      <NavLink to={RoutesList.Home}
               className={classNames(styles.backHome, {
                 [styles.backHomeDark]: isDark,
               })}
      >
        Back to home
      </NavLink>
      <div className={classNames(styles.title)}>
        <Title title={"Sign Up"} />
      </div>
      <div className={styles.wrapper}>
        <div
          className={classNames(styles.inputContainer, {
            [styles.inputContainerDark]: isDark,
          })}
        >
          <Input
            value={name}
            onChange={onChangeName}
            type={"text"}
            title="Name"
            placeholder="Your name"
          />

          <Input
            value={email}
            onChange={onChangeEmail}
            type={"text"}
            title="Email"
            placeholder="Your email"
          />
          <Input
            value={password}
            onChange={onChangePassword}
            type={"password"}
            title="Password"
            placeholder="Your password"
          />
          <Input
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            type={"password"}
            title="Confirm password"
            placeholder="Confirm password"
          />

          <div className={styles.button}>
            <Button
              title={"Sign Up"}
              onClick={() => {}}
              type={ButtonType.Primary}
            />
          </div>
          <div
            className={classNames(styles.singUp, {
              [styles.darkSingUp]: isDark,
            })}
          >
            Already have an account?{" "}
            <NavLink to={RoutesList.SignIn} className={styles.navButton}>
              Sign In
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
