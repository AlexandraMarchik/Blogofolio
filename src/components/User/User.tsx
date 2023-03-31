import React, { FC, ReactNode } from "react";
import styles from "../User/User.module.scss";
import MenuBurger from "../MenuBurger";
import {UserInfoResponse} from "../../redux/sagas/@types";

type UserProps = {
  userName: string;
  className?: string
};

const User: FC<UserProps> = ({ userName,className }) => {
  return (
    <div className={styles.userBlock}>
      <div className={styles.user}>
        <div className={styles.userLetter}>
          {userName
            .split(" ")
            .map((word: string) => word[0])
            .join("")}
        </div>
        {userName}
      </div>
    </div>
  );
};

export default User;
