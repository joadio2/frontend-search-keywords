import styles from "../Form.module.css";

type ModalProps = {
  inputType: "url" | "keyword";
  urlCount: number;
  keywordCount: number;
  setUrlCount: (n: number) => void;
  setKeywordCount: (n: number) => void;
  handleGenerateInputs: () => void;
  setShowModal: (v: boolean) => void;
};

export default function ModalInputs({
  inputType,
  urlCount,
  keywordCount,
  setUrlCount,
  setKeywordCount,
  handleGenerateInputs,
  setShowModal,
}: ModalProps) {
  const handleAccept = () => {
    if (inputType === "url" && urlCount < 2) {
      alert("You must enter at least 2 URLs.");
      return;
    }
    if (inputType === "keyword" && (keywordCount < 1 || keywordCount > 20)) {
      alert("You must enter at least 1 keyword and no more than 20 keywords.");
      return;
    }

    handleGenerateInputs();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>How much {inputType === "url" ? "URLs" : "Keywords"}? </h3>
        <input
          className={styles.input}
          style={{ color: "black" }}
          type="number"
          min="1"
          value={inputType === "url" ? urlCount : keywordCount}
          onChange={(e) =>
            inputType === "url"
              ? setUrlCount(Number(e.target.value))
              : setKeywordCount(Number(e.target.value))
          }
        />
        <div className={styles.modalButtons}>
          <button onClick={handleAccept} className={styles.modalButton}>
            GO
          </button>
          <button
            onClick={() => setShowModal(false)}
            className={styles.secundary}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
