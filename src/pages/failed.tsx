import { useState } from "react";
import styles from "./Failed.module.css"; // Assuming you use this file
import { useNavigate } from "react-router-dom";
export default function Failed() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(
    "An error occurred during processing. Please try again later."
  );

  const handleRetry = () => {
    navigate("/");
  };

  return (
    <section className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Something Went Wrong</h1>
        <p className={styles.message}>{errorMessage}</p>
      </div>

      <div className={styles.resultSection}>
        <button onClick={handleRetry} className={styles.button}>
          Retry
        </button>
      </div>
    </section>
  );
}
