import { useState } from "react";
import styles from "./Form.module.css";
import ModalInputs from "./modal/modal";
import ScheduleModal from "./modal/scheduleModal";
import { fechRunNow } from "./fuction/fechRunNow";
import { ScheduleData, DataFetch } from "./interface/dataFecht";
export default function KeywordUrlForm() {
  const [showModal, setShowModal] = useState(false);
  const [inputType, setInputType] = useState<"url" | "keyword" | null>(null);
  const [urlCount, setUrlCount] = useState(0);
  const [keywordCount, setKeywordCount] = useState(0);
  const [urls, setUrls] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [reportType, setReportType] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const handleGenerateInputs = () => {
    if (inputType === "url") {
      setUrls(Array(urlCount).fill(""));
    } else {
      setKeywords(Array(keywordCount).fill(""));
    }
    setShowModal(false);
  };
  async function onNow(schduleData: ScheduleData) {
    const data: DataFetch = {
      ...schduleData,
      urls,
      keywords,
      userId: 1,
      role: "admin",
    };
    await fechRunNow(data);
  }
  const handleInputChange = (
    index: number,
    value: string,
    type: "url" | "keyword"
  ) => {
    if (type === "url") {
      const updated = [...urls];
      updated[index] = value;
      setUrls(updated);
    } else {
      const updated = [...keywords];
      updated[index] = value;
      setKeywords(updated);
    }
  };

  const handleSchedule = (datetime: string) => {
    setShowScheduleModal(false);
    alert(
      `Monitoreo programado para: ${datetime}\nTipo de reporte: ${reportType}\nEtiquetas: ${tags.join(
        ", "
      )}\nCorreo: ${email}`
    );
  };

  return (
    <div className={styles.container}>
      <section className={styles.columnContainer}>
        <div className={styles.column}>
          <h2>URLs</h2>
          {urls.map((url, idx) => (
            <input
              className={styles.input}
              key={idx}
              type="text"
              placeholder={`URL ${idx + 1}`}
              value={url}
              onChange={(e) => handleInputChange(idx, e.target.value, "url")}
            />
          ))}
          <button
            onClick={() => {
              setInputType("url");
              setShowModal(true);
            }}
          >
            Añadir URLs
          </button>
        </div>

        <div className={styles.column}>
          <h2>key Words</h2>
          {keywords.map((kw, idx) => (
            <input
              className={styles.input}
              style={{ color: "black" }}
              key={idx}
              type="text"
              placeholder={`word ${idx + 1}`}
              value={kw}
              onChange={(e) =>
                handleInputChange(idx, e.target.value, "keyword")
              }
            />
          ))}
          <button
            onClick={() => {
              setInputType("keyword");
              setShowModal(true);
            }}
          >
            Añadir Palabras Clave
          </button>
        </div>
      </section>

      {urlCount >= 1 && keywordCount >= 1 && (
        <section className={styles.confirm}>
          <button
            className={styles.confirmButton}
            onClick={() => setShowScheduleModal(true)}
          >
            Add Monitoring
          </button>
        </section>
      )}

      {showModal && inputType && (
        <ModalInputs
          inputType={inputType}
          urlCount={urlCount}
          keywordCount={keywordCount}
          setUrlCount={setUrlCount}
          setKeywordCount={setKeywordCount}
          handleGenerateInputs={handleGenerateInputs}
          setShowModal={setShowModal}
        />
      )}

      {showScheduleModal && (
        <ScheduleModal
          onClose={() => setShowScheduleModal(false)}
          onNow={() => {
            setShowScheduleModal(false);
            onNow({
              email,
              reportType,
              tags,
              schedule: false,
            });
          }}
          onSchedule={(datetime) => handleSchedule(datetime)}
          email={email}
          setEmail={setEmail}
          reportType={reportType}
          setReportType={setReportType}
          tags={tags}
          setTags={setTags}
        />
      )}
    </div>
  );
}
