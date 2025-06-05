import React from "react";
import Nav from "../components/home/nav";
import docs from "../assets/document.png";
import styles from "./List.module.css";
import { getId } from "../components/home/fuction/getId";
import { Link } from "react-router-dom";
interface FileItem {
  userId: string;
  url: string;
  title: string;
}

export default function List() {
  const [data, setData] = React.useState<FileItem[]>([]);

  const fetchData = async () => {
    try {
      const userId = await getId();
      const res = await fetch(
        `https://sea-lion-app-xhc8a.ondigitalocean.app/getfiles/${userId}`
      );
      const json = await res.json();
      if (res.ok) {
        setData(json.data);
      } else {
        setData([]);
      }
    } catch (error) {
      setData([]);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <Nav />
      <div className={styles.cardContainer}>
        {data.length > 0 && (
          <>
            {data.map((item, index) => (
              <Link
                key={index}
                to={`/report?title=${encodeURIComponent(`${item.title}`)}`}
              >
                <div className={styles.card}>
                  <img src={docs} alt={item.title} className={styles.img} />

                  <h1 className={styles.title}>{item.title}</h1>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
