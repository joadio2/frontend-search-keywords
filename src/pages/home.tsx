import { useState } from "react";
import styles from "./Home.module.css";
import Nav from "../components/home/nav";
import KeywordUrlForm from "../components/home/form";
import docs from "../assets/document.png";
import HowItWorks from "../components/infoModal/infoModal";
import { IoInformationCircle } from "react-icons/io5";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className={styles.containerTitle}>
        <h1 className={styles.title}>DocHawk</h1>
        <img src={docs} alt="docs" className={styles.docs} />
      </div>
      <div className={styles.helpContainer}>
        <button className={styles.helpButton} onClick={() => setIsOpen(true)}>
          How it works
          <IoInformationCircle fontSize={30} />
        </button>
      </div>

      <div>
        <KeywordUrlForm />
        <Nav />
      </div>
      <HowItWorks isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
