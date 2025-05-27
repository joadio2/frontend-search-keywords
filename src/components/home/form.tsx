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
import ValidationAlertModal from "./modal/validationModal";
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
  const [showValidationModal, setShowValidationModal] = useState({
    message: "",
    isOpen: false,
  });
  const [urlErrors, setUrlErrors] = useState<boolean[]>([]);
  const [keywordErrors, setKeywordErrors] = useState<boolean[]>([]);
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
        title: schduleData.title,
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
    if (response.status !== 201) return navigate("/failed");
    navigate("/completed", {
      state: {
        data: response.scheduleTask,
        isScheduled: true,
        title: formdata.title,
      },
    });
    setIsLoading(false);
  }
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };
  function isSingleWord(str: string): boolean {
    return /^\S+$/.test(str); // no espacios
  }
  const validateInputs = () => {
    const urlValidation = urls.map(isValidUrl);
    const keywordValidation = keywords.map(isSingleWord);

    setUrlErrors(urlValidation.map((v) => !v));
    setKeywordErrors(keywordValidation.map((v) => !v));

    const allValid =
      urlValidation.every(Boolean) &&
      keywordValidation.every(Boolean) &&
      keywords.length >= 3;

    if (!allValid) {
      let errorMessage = "Please fix errors before proceeding. ";

      if (!urlValidation.every(Boolean)) {
        errorMessage += "URLs must be valid. ";
      }
      if (!keywordValidation.every(Boolean)) {
        errorMessage += "Keywords cannot contain spaces and not be empty. ";
      }
      if (keywords.length < 3) {
        errorMessage += "You must enter at least 3 keywords.";
      }

      setShowValidationModal({
        message: errorMessage,
        isOpen: true,
      });

      return;
    }

    setShowScheduleModal(true);
    return allValid;
  };

  console.log(showValidationModal);
  return (
    <div className={styles.container}>
      <section className={styles.columnContainer}>
        <div className={styles.column}>
          <h2>URLs</h2>
          {urls.map((url, idx) => (
            <input
              className={`${styles.input} ${
                urlErrors[idx] ? styles.inputInvalid : ""
              }`}
              key={idx}
              type="url"
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
              className={`${styles.input} ${
                keywordErrors[idx] ? styles.inputInvalid : ""
              }`}
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
          <button className={styles.confirmButton} onClick={validateInputs}>
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

      {showValidationModal.isOpen && (
        <ValidationAlertModal
          message={showValidationModal.message}
          onClose={() => setShowValidationModal({ isOpen: false, message: "" })}
        />
      )}
    </div>
  );
}
