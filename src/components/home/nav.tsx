import styles from "./Nav.module.css";
import BoxNav from "./boxNav";
import calendar from "../../assets/icon/calendar.webp";
import config from "../../assets/icon/settings.webp";
import list from "../../assets/icon/list.webp";
export default function Nav() {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <BoxNav text="Calendar" iconSrc={calendar} />
        <BoxNav text="Config" iconSrc={config} />
        <BoxNav text="List" iconSrc={list} />
      </div>
    </div>
  );
}
