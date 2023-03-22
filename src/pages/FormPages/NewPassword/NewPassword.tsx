import React, { useEffect, useMemo, useState } from "react";

import styles from './NewPassword.module.scss'
import FormPages from "../FormPages";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { ButtonType } from "../../../utils/@globalTypes";

const NewPassword = () => {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onChangePassword = (value: string) => {
    setPassword(value);
  };
  const onChangeConfirmPassword = (value: string) => {
    setConfirmPassword(value);
  };

  useEffect(() => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords must match");
    } else if (password.length === 0 || confirmPassword.length === 0) {
      setPasswordError("Password is required field");
    } else {
      setPasswordError("");
    }
  }, [confirmPassword, password]);


  const isValid = useMemo(() => {
    return passwordError.length === 0;
  }, [passwordError]);

  return (
    <FormPages title={"New password"}>
      <div className={styles.inputContainer}>
        <Input
          value={password}
          onChange={onChangePassword}
          type={"password"}
          title="Password"
          placeholder="Your password"
          errorText={passwordError}
        />
        <Input
          value={confirmPassword}
          onChange={onChangeConfirmPassword}
          type={"password"}
          title="Confirm password"
          placeholder="Confirm your password"
          errorText={passwordError}
        />

      <div className={styles.button}>
        <Button
          title={"Set password "}
          disabled={!isValid}
          onClick={() => {}}
          type={ButtonType.Primary}
        />
      </div>
      </div>
    </FormPages>
  );
};

export default NewPassword;
