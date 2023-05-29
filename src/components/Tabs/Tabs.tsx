import React, { FC, useMemo } from "react";
import styles from "./Tabs.module.scss";
import classNames from "classnames";
import {  TabsProps } from "./type";
import { Theme, useThemeContext } from "src/context/Theme/Context";
import { AuthSelectors } from "src/redux/reducers/authSlice";
import { useSelector } from "react-redux";
import {TabsNames} from "src/utils/@globalTypes";

const Tabs: FC<TabsProps> = ({ activeTab, onClick }) => {
  const { theme } = useThemeContext();
  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);

  const TABS_LIST = useMemo(
    () => [
      {
        title: "All",
        disabled: false,
        key: TabsNames.All,
      },
      {
        title: "My Posts",
        disabled: !isLoggedIn,
        key: TabsNames.MyPosts,
      },
      {
        title: "Popular",
        disabled: false,
        key: TabsNames.Popular,
      },
        {
            title: "Favourites",
            disabled: !isLoggedIn,
            key: TabsNames.Favourites,
        },
    ],
    [isLoggedIn]
  );

  const onTabClick = (key: TabsNames) => () => onClick(key);

  return (
    <div
      className={classNames(styles.container, {
        [styles.darkContainer]: theme === Theme.Dark,
      })}
    >
      {TABS_LIST.map((tab) => {
        return (
          <div
            key={tab.key}
            className={classNames(styles.tab, {
              [styles.activeTab]: activeTab === tab.key,
              [styles.disabled]: tab.disabled,
            })}
            onClick={tab.disabled ? undefined : onTabClick(tab.key)}
          >
            {tab.title}
          </div>
        );
      })}
    </div>
  );
};
export default Tabs;
