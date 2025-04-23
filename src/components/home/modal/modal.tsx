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
    if (inputType === "url" && urlCount < 1) {
      alert("Debes ingresar al menos 2 URLs.");
      return;
    }
    if (inputType === "keyword" && keywordCount < 1) {
      alert("Debes ingresar al menos 1 palabra clave.");
      return;
    }

    handleGenerateInputs();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>
          ¿Cuántas {inputType === "url" ? "URLs" : "Palabras Clave"} quieres?
        </h3>
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
            Aceptar
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
