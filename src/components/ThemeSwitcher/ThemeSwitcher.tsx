import React from "react";
import classNames from "classnames";

import styles from "./ThemeSwitcher.module.scss";
import { MoonIcon, SunIcon } from "src/assets/icons";
import {Theme, useThemeContext} from "src/context/Theme/Context";

const ThemeSwitcher = () => {
    const { theme, onChangeTheme } = useThemeContext();

    const onClick = (value: Theme) => () => onChangeTheme(value);

  return (
    <div className={styles.container} >
      <div className={classNames(styles.button, {
          [styles.activeButton]: theme === Theme.Light,
      })}
           onClick={onClick(Theme.Light)}
      >
        <SunIcon />
      </div>
      <div className={classNames(styles.button, {
          [styles.activeButton]: theme === Theme.Dark,
      })}
           onClick={onClick(Theme.Dark)}
      >
        <MoonIcon />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
