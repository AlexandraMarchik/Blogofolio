import React from "react";
import Lottie from "lottie-react";

import loader from "src/assets/loader.json";
import styles from './Loader.module.scss'

const Loader = () => {
  return (
    <div className={styles.loader}>
      <Lottie
        style={{ width: 200, height: 200 }}
        animationData={loader}
        loop={true}
      />
    </div>
  );
};

export default Loader;
