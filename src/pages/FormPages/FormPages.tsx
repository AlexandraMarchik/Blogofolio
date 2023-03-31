import React, {FC, ReactNode} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames";

import {Theme, useThemeContext} from "../../context/Theme/Context";
import {RoutesList} from "../Router";
import styles from './FormPages.module.scss'
import Title from "../../components/Title";


type FormPagesProps={
    title: string,
    children: ReactNode
}

const FormPages: FC<FormPagesProps> = ({ title, children }) => {
 const { theme } = useThemeContext();
 const isDark = theme === Theme.Dark;

  return (
    <div>
      <div
        className={classNames(styles.container, {
          [styles.containerDark]: isDark,
        })}
      >
        <NavLink
          to={RoutesList.Home}
          className={classNames(styles.backHome, {
            [styles.backHomeDark]: isDark,
          })}
        >
          Back to home
        </NavLink>
        <div className={classNames(styles.title)}>
          <Title title={title} />
        </div>
        <div className={styles.wrapper}>{children}</div>
      </div>
    </div>
  );
};

export default FormPages