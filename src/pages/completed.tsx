import styles from "./Completed.module.css";
import docs from "../assets/document.png";
import { useNavigate, useLocation } from "react-router-dom";
export default function Completed() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isScheduled, title } = location.state || {};

  const handleClick = () => {
    if (isScheduled) {
      navigate("/calendar");
      return;
    }
    navigate(`/report?title=${encodeURIComponent(`${title}`)}`);
  };

  return (
    <section className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.logo} onClick={() => navigate("/")}>
          <h1 className={styles.titleLogo}>DocsHawk</h1>
          <img src={docs} alt="Document" className={styles.docs} />
        </div>

        <h1 className={styles.title}>
          {isScheduled ? "YOUR REPORT IS SCHEDULED" : "YOUR REPORT IS READY"}
        </h1>
      </div>
      <p className={styles.message}>
        {isScheduled
          ? "Your report is scheduled to be sent on the following date and time:"
          : "Your report is ready to be downloaded."}{" "}
        <span>{isScheduled && data}</span>
      </p>

      <div className={styles.resultSection}>
        <p>
          {isScheduled
            ? "Check our calendar for more information about your scheduled report."
            : "Click below to view or download your report:"}
        </p>

        <button onClick={handleClick} className={styles.button}>
          {isScheduled ? "View Scheduled Report" : "View Report"}
        </button>
      </div>
    </section>
  );
}
