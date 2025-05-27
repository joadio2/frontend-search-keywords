import { FiAlertCircle } from "react-icons/fi";
import styles from "./ValidationModal.module.css";

interface ValidationAlertModalProps {
  message: string;
  onClose: () => void;
}

export default function ValidationAlertModal({
  message,
  onClose,
}: ValidationAlertModalProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <FiAlertCircle className={styles.icon} />
        <h2 className={styles.title}>Input Error</h2>
        <p className={styles.message}>{message}</p>
        <button className={styles.button} onClick={onClose}>
          Okay
        </button>
      </div>
    </div>
  );
}
