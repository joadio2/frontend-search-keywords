import React from "react";
import Nav from "../components/home/nav";
import docs from "../assets/document.png";
import styles from "./List.module.css";
import { getId } from "../components/home/fuction/getId";

interface FileItem {
  userId: string;
  url: string; // URL del recurso
  title: string;
}

export default function List() {
  const [data, setData] = React.useState<FileItem[]>([]);

  const fetchData = async () => {
    const userId = await getId();
    const res = await fetch(`http://localhost:3000/getfiles/${userId}`);
    const json = await res.json();
    setData(json.data);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <Nav />
      <div className={styles.cardContainer}>
        {data.map((item, index) => (
          <div key={index} className={styles.card}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <img src={docs} alt={item.title} className={styles.img} />
            </a>
            <h1 className={styles.title}>{item.title}</h1>
          </div>
        ))}
      </div>
    </section>
  );
}
