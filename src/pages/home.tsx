import styles from "./Home.module.css";
import Nav from "../components/home/nav";
import KeywordUrlForm from "../components/home/form";
import docs from "../assets/document.png";
export default function Home() {
  return (
    <div>
      <div className={styles.containerTitle}>
        <h1 className={styles.title}>DocHawk</h1>
        <img src={docs} alt="docs" className={styles.docs} />
      </div>
      <div>
        <KeywordUrlForm />
        <Nav />
      </div>
    </div>
  );
}
