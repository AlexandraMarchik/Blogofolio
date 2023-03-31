import React, { FC, ReactNode } from "react";
import classNames from "classnames";

import styles from "./Button.module.scss";
import {ButtonType} from "../../utils/@globalTypes";


type ButtonProps = {
  title: string | ReactNode;
  onClick: () => void;
  type: ButtonType;
  disabled?: boolean;
  className?: string;
};

const btnStyles = {
  [ButtonType.Primary]: styles.primaryButton,
  [ButtonType.Secondary]: styles.secondaryButton,
  [ButtonType.Error]: styles.errorButton,


};
const Button: FC<ButtonProps> = ({ title, onClick, type, disabled,className }) => {
  const buttonClassName = btnStyles[type];
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={classNames(buttonClassName,className, {
        [styles.disabledButton]: disabled,
      })}
    >
      {title}
    </div>
  );
};

export default Button;
