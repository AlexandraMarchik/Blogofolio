import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import styles from "./SignIn.module.scss";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { ButtonType } from "../../../utils/@globalTypes";
import { Theme, useThemeContext } from "../../../context/Theme/Context";
import { RoutesList } from "../../Router";
import FormPages from "../FormPages";
import {signInUser} from "../../../redux/reducers/authSlice";

const SignIn = () => {
  const { theme } = useThemeContext();
  const isDark = theme === Theme.Dark;
  const navigate=useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onChangeEmail = (value: string) => {
    setEmail(value);
  };
  const onChangePassword = (value: string) => {
    setPassword(value);
  };
  const onResetPasswordPage = () => {
    navigate(RoutesList.ResetPassword);
  };

  const onSignInClick = () => {
    dispatch(
        signInUser({
          data: { email, password },
          callback: () => navigate(RoutesList.Home),
        })
    );
  };


  useEffect(() => {
    if (email.length === 0) {
      setEmailError("Email is required field");
    } else {
      setEmailError("");
    }
  }, [email]);

  useEffect(() => {
    if (password.length === 0) {
      setPasswordError("Password is required field");
    } else {
      setPasswordError("");
    }
  }, [password]);

  const isValid = useMemo(() => {
    return emailError.length === 0 && passwordError.length === 0;
  }, [emailError,passwordError ]);

  return (
    <FormPages title={"Sign In"}>
      <div
        className={classNames(styles.inputContainer, {
          [styles.inputContainerDark]: isDark,
        })}
      >
        <Input
          value={email}
          onChange={onChangeEmail}
          type={"text"}
          title="Email"
          placeholder="Your email"
          errorText={emailError}
        />
        <Input
          value={password}
          onChange={onChangePassword}
          type={"password"}
          title="Password"
          placeholder="Your password"
          errorText={passwordError}
        />
        <div onClick={onResetPasswordPage}
          className={classNames(styles.forgotPassword, {
            [styles.darkThemeForgotPassword]: isDark,
          })}
        >
          Forgot password?
        </div>
        <div className={styles.button}>
          <Button
            title={"Sign In"}
            disabled={!isValid}
            onClick={onSignInClick}
            type={ButtonType.Primary}
          />
        </div>
        <div
          className={classNames(styles.singUp, {
            [styles.darkSingUp]: isDark,
          })}
        >
          Don’t have an account?{" "}
          <NavLink to={RoutesList.SignUp} className={styles.navButton}>
            Sign Up
          </NavLink>
        </div>
      </div>
    </FormPages>
  );
};

export default SignIn;
