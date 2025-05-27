import styles from "./InfoModal.module.css";
type Props = {
  isOpen: boolean;
  onClose: () => void;
};
export default function HowItWorks({ isOpen, onClose }: Props) {
  if (!isOpen) return null;
  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={onClose}>
              ✕
            </button>
            <h1 className={styles.title}>How Does It Work?</h1>
            <p className={styles.text}>
              This tool allows you to analyze content from public{" "}
              <strong>PDF</strong> or <strong>HTML</strong> URLs using your
              chosen keywords.
            </p>
            <div className={styles.steps}>
              <div className={styles.card}>
                <h3>🔗 Add URLs</h3>
                <p>
                  Enter one or more URLs pointing to publicly accessible HTML
                  pages or PDF files.
                </p>
              </div>
              <div className={styles.card}>
                <h3>📝 Enter Keywords</h3>
                <p>
                  Provide at least <strong>3 keywords</strong> you want to
                  search for in the documents.
                </p>
              </div>
              <div className={styles.card}>
                <h3>📊 Generate Report</h3>
                <p>The system will analyze the content and return:</p>
                <ul>
                  <li>
                    <strong>Score:</strong> Relevance of content based on your
                    keywords.
                  </li>
                  <li>
                    <strong>Snippet:</strong> A preview of where the keyword
                    appears.
                  </li>
                  <li>
                    <strong>Page / ID:</strong> Exact location in the document.
                  </li>
                </ul>
              </div>
            </div>
            <p className={styles.text}>
              You can also schedule recurring analysis by clicking{" "}
              <strong>"Add Monitoring"</strong>.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
