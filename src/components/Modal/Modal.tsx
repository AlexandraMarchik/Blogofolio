import React, { FC, ReactNode } from "react";

import styles from "./Modal.module.scss";
import { CloseIconModal } from "../../assets/icons";

type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: FC<ModalProps> = ({ isVisible, onClose, children }) => {
  return isVisible ? (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <div className={styles.closeIcon} onClick={onClose}>
          <CloseIconModal />
        </div>
        <div className={styles.infoContainer}>{children}</div>
      </div>
    </div>
  ) : null;
};

export default Modal;
