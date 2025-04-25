import { useState } from "react";
import styles from "./Form.module.css";
import ModalInputs from "./modal/modal";
import ScheduleModal from "./modal/scheduleModal";
import { fetchRunNow } from "./fuction/fechRunNow";
import { fechSchedule } from "./fuction/fetchSchedule";
import { Task } from "./interface/dataFecht";
import Loader from "../../pages/loader";
import { getId } from "./fuction/getId";
import { useNavigate } from "react-router-dom";
import { scheduler } from "timers/promises";
export default function KeywordUrlForm() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [inputType, setInputType] = useState<"url" | "keyword" | null>(null);
  const [urlCount, setUrlCount] = useState(0);
  const [keywordCount, setKeywordCount] = useState(0);
  const [urls, setUrls] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  if (isLoading) return <Loader />;
  const handleGenerateInputs = () => {
    if (inputType === "url") {
      setUrls(Array(urlCount).fill(""));
    } else {
      setKeywords(Array(keywordCount).fill(""));
    }
    setShowModal(false);
  };
  async function runNow(schduleData: Task) {
    setIsLoading(true);

    const user = await getId();
    const data: Task = {
      ...schduleData,
      urls,
      keywords,
      userId: user,
    };
    const response = await fetchRunNow(data);
    if (response.status !== 200) return navigate("/failed");
    navigate("/completed", {
      state: {
        data: response.html,
        isScheduled: false,
      },
    });
    setIsLoading(false);
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

  async function handleSchedule(formdata: Task) {
    setShowScheduleModal(false);
    setIsLoading(true);
    const user = await getId();
    const data: Task = {
      ...formdata,
      urls,
      keywords,
      userId: user,
    };

    const response = await fechSchedule(data);
    if (response.status !== 200) return navigate("/failed");
    navigate("/completed", {
      state: {
        data: response.scheduleTask,
        isScheduled: true,
      },
    });
    setIsLoading(false);
  }

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
            Add URLs
          </button>
        </div>

        <div className={styles.column}>
          <h2>Keywords</h2>
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
            Add Keywords
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
          onNow={runNow}
          onSchedule={handleSchedule}
        />
      )}
    </div>
  );
}
