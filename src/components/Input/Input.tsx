import React, { ChangeEvent, FC, useState } from "react";
import classNames from "classnames";
import styles from "./Input.module.scss";
import { Theme, useThemeContext } from "../../context/Theme/Context";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  title: string;
  placeholder: string;
  disabled?: boolean;
  errorText?: string;
  type: string;
 };
const Input: FC<InputProps> = ({
  type,
  value,
  title,
  placeholder,
  disabled,
  errorText,
   onChange,
}) => {
  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {

      onChange(e.target.value)
  };
  const { theme } = useThemeContext();

  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.title, {
          [styles.darkTitle]: theme === Theme.Dark,
        })}
      >
        {title}
      </div>
      <input
        type={type}
        value={value}
        className={classNames(styles.input, {
          [styles.disabled]: disabled,
          [styles.valid]: errorText,
        })}
        placeholder={placeholder}
        onChange={onChangeText}
        disabled={disabled}
      />
      {errorText && <div className={styles.validText}>{errorText}</div>}
    </div>
  );
};

export default Input;
