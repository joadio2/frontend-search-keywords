import { useState } from "react";
import Nav from "../home/nav";
import styles from "./Report.module.css";
import { useReportStore } from "../../store/useReportStore";
import { useLocation, useNavigate } from "react-router-dom";

type ResultItem = {
  id: string;
  snippet: string;
  keywords: string[];
  total: number;
  score: number;
};

function getScoreClass(score: number): string {
  if (score >= 0.75) return styles.highScore;
  if (score >= 0.5) return styles.mediumScore;
  return styles.lowScore;
}

export default function RenderReport() {
  const location = useLocation();
  const navigate = useNavigate();
  const { datosReport } = useReportStore();
  console.log(datosReport);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const { title } = location.state || {};
  console.log(title);
  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Si no tienes datos cargados, muestra mensaje
  if (!datosReport || !datosReport.match?.data?.results?.length)
    return <div>Cargando datos...</div>;

  const results: ResultItem[] = datosReport.match.data.results;
  function goBack() {
    navigate(`/report?title=${encodeURIComponent(`${title}`)}`);
  }

  function handleViewDoc(id: string) {
    const url = `${datosReport?.match?.htmlDoc}#${id}`;
    window.open(url, "_blank");
  }
  return (
    <div className={styles.wrapper}>
      <Nav />
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <button
            className={styles.backButton}
            aria-label="Volver atrás"
            onClick={goBack}
          >
            ← Volver
          </button>
          <h2 className={styles.sidebarTitle}>Results Index</h2>
          <ul className={styles.indexList}>
            {results.map((item, index) => (
              <li key={item.id} className={styles.indexItem}>
                <a className={styles.indexLink} href={`#result-${index + 1}`}>
                  Result {index + 1}
                  <span
                    className={`${styles.scoreBadgeMini} ${getScoreClass(
                      item.score
                    )}`}
                  >
                    {item.score.toFixed(2)}
                  </span>
                  <p className={styles.indexSnippet}>
                    {item.snippet.split(" ").slice(0, 12).join(" ")}...
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <main className={styles.container}>
          <h1 className={styles.title}>Report</h1>

          {results.map((item, index) => {
            const maxWords = 50;
            const words = item.snippet.split(" ");
            const isLong = words.length > maxWords;
            const shortSnippet = words.slice(0, maxWords).join(" ");

            const expanded = expandedItems.has(item.id);

            return (
              <div
                key={item.id}
                id={`result-${index + 1}`}
                className={styles.card}
              >
                <div className={styles.header}>
                  <span className={styles.id}>
                    {`${datosReport?.typeDocument === "pdf" ? "PAGE" : "ID"}`}:{" "}
                    {datosReport?.typeDocument === "pdf"
                      ? `${Math.max(0, Number(item.id) - 1)} / ${item.id}`
                      : item.id}
                  </span>
                  <span
                    className={`${styles.scoreBadge} ${getScoreClass(
                      item.score
                    )}`}
                  >
                    Score: {item.score.toFixed(2)}
                  </span>
                </div>

                <p className={styles.snippet}>
                  {expanded || !isLong ? item.snippet : `${shortSnippet}...`}
                  {isLong && (
                    <button
                      className={styles.toggleButton}
                      onClick={() => toggleExpand(item.id)}
                    >
                      {expanded ? " Ver menos" : " Ver más"}
                    </button>
                  )}
                </p>

                <div className={styles.keywords}>
                  {item.keywords.map((kw, i) => (
                    <span key={i} className={styles.keyword}>
                      {kw}
                    </span>
                  ))}
                </div>

                {datosReport?.typeDocument === "html" && (
                  <div className={styles.actions}>
                    <button
                      className={styles.buttonAction}
                      onClick={() => handleViewDoc(item.id)}
                    >
                      Show in Doc
                    </button>
                  </div>
                )}

                <div className={styles.progressBar}>
                  <div
                    className={`${styles.progress} ${getScoreClass(
                      item.score
                    )}`}
                    style={{ width: `${Math.min(item.score * 100, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </div>
  );
}
