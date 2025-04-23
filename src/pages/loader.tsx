import Lottie from "lottie-react";
import styles from "./Loader.module.css";
import loaderAnimation from "../assets/loader.json";
export default function Loader() {
  return (
    <div className={styles.loader}>
      <Lottie
        className={styles.loaderAnimation}
        animationData={loaderAnimation}
        loop
        autoplay
      />

      <span className={styles.loaderText}>Cargando...</span>
    </div>
  );
}
