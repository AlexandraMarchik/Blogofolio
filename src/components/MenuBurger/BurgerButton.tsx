import React, {FC } from "react";

import styles from "./BurgerButton.module.scss";
import Button from "../Button";
import { CloseIcon, OpenedMenu } from "../../assets/icons";
import {ButtonType} from "../../utils/@globalTypes";


type MenuButtonProps = {
  isOpened: boolean;
  onButtonClick: () => void;
}
const MenuBurger: FC <MenuButtonProps>= ({isOpened, onButtonClick}) => {

  return (
    <Button
      className={styles.btn}
      type={ButtonType.Primary}
      title={!isOpened ? <OpenedMenu /> : <CloseIcon />}
      onClick={onButtonClick}
    />
  );
};

export default MenuBurger;
