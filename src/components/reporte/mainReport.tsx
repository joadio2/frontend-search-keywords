import styles from "./MainReport.module.css";
import Nav from "../home/nav";
import { useReportStore } from "../../store/useReportStore";
import { useNavigate } from "react-router-dom";

type MatchItem = {
  id: string;
  snippet: string;
  keywords: string[];
  total: number;
  score: number;
};

type DocumentItem = {
  url: string;
  typeDocument: string;
  match: {
    typeDocument: string;
    data: {
      results: MatchItem[];
    };
    htmlDoc?: string | undefined;
  };
};

type Props = {
  data: {
    data: DocumentItem[];
    title: string;
    userId: string;
    reportType: string;
    keywords: string[];
    tags: string[];
  };
};

export default function MainReport({ data }: Props) {
  const { setDatos } = useReportStore();
  const navigate = useNavigate();

  if (!data) return <div>Cargando...</div>;

  const groupedByType: { [type: string]: DocumentItem[] } = data.data.reduce(
    (acc, doc) => {
      if (!acc[doc.typeDocument]) acc[doc.typeDocument] = [];
      acc[doc.typeDocument].push(doc);
      return acc;
    },
    {} as { [type: string]: DocumentItem[] }
  );
  function handleDoc(doc: DocumentItem) {
    setDatos(doc);
    navigate(`/reportDetail`, {
      state: {
        title: data.title,
      },
    });
  }
  return (
    <div className={styles.container}>
      <Nav />
      <h1 className={styles.title}>📊 Reportes Analizados</h1>

      {Object.entries(groupedByType).map(([type, docs]) => (
        <div key={type} className={styles.group}>
          <h2 className={styles.groupTitle}>
            {type === "PDF" && "📄 Documentos PDF"}
            {type === "Word" && "📝 Documentos Word"}
            {type === "HTML" && "🌐 Páginas HTML"}
            {!["PDF", "Word", "HTML"].includes(type) && `📁 ${type}`}
          </h2>

          {docs.map((doc, i) => (
            <div key={i} className={styles.reportSection}>
              <div className={styles.body}>
                <p className={styles.label}>🔗 Enlace:</p>
                <a
                  className={styles.url}
                  href={doc.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {doc.url}
                </a>
              </div>

              <div className={styles.actions}>
                <button
                  className={styles.button}
                  onClick={() => handleDoc(doc)}
                >
                  📄 Ver Detalle del Reporte
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
