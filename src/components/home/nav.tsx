import styles from "./Nav.module.css";
import BoxNav from "./boxNav";
import calendar from "../../assets/icon/calendar.webp";
import search from "../../assets/icon/search.png";
import list from "../../assets/icon/list.webp";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <Link to="/calendar">
          <BoxNav text="Calendar" iconSrc={calendar} />
        </Link>
        <Link to="/">
          <BoxNav text="Search" iconSrc={search} />
        </Link>
        <Link to="/list">
          <BoxNav text="List" iconSrc={list} />
        </Link>
      </div>
    </div>
  );
}
