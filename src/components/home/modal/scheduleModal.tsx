import React from "react";
import styles from "./scheduleModal.module.css";
import calendar from "../../../assets/icon/calendar.webp";
import play from "../../../assets/icon/play.webp";
import Select from "react-select";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type ScheduleModalProps = {
  onClose: () => void;
  onNow: (data: {
    email: string | null;
    reportType: string | null;
    tags: string[];
    repeatMonthly: boolean;
  }) => void;
  onSchedule: (
    datetime: string,
    data: {
      email: string | null;
      reportType: string | null;
      tags: string[];
      repeatMonthly: boolean;
    }
  ) => void;
  email: string | null;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
  reportType: string | null;
  setReportType: React.Dispatch<React.SetStateAction<string | null>>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
};

const reportOptions = [
  {
    value: "Detección de Palabras Sensibles",
    label: "Detección de Palabras Sensibles",
  },
  { value: "Análisis de Cumplimiento", label: "Análisis de Cumplimiento" },
];

const tagOptions = [
  { value: "Auditoría de Seguridad", label: "Auditoría de Seguridad" },
  { value: "Revisión de Documentos", label: "Revisión de Documentos" },
  {
    value: "Reporte de Confidencialidad",
    label: "Reporte de Confidencialidad",
  },
];

export default function ScheduleModal({
  onClose,
  onNow,
  onSchedule,
  email,
  setEmail,
  reportType,
  setReportType,
  tags,
  setTags,
}: ScheduleModalProps) {
  const [selectProcess, setSelectProcess] = React.useState<
    "now" | "schedule" | null
  >(null);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = React.useState("12:00");
  const [repeatMonthly, setRepeatMonthly] = React.useState(false);

  const handleSchedule = () => {
    if (!selectedDate) return;
    const [hour, minute] = selectedTime.split(":");
    const scheduled = new Date(selectedDate);
    scheduled.setHours(parseInt(hour, 10));
    scheduled.setMinutes(parseInt(minute, 10));
    const formData = {
      email,
      reportType,
      tags,
      repeatMonthly,
    };
    onSchedule(scheduled.toISOString(), formData);
  };

  const handlerEvent = () => {
    const formData = {
      email,
      reportType,
      tags,
      repeatMonthly,
    };

    if (selectProcess === "now") {
      onNow(formData);
    } else {
      handleSchedule();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        {selectProcess === null ? (
          <div className={styles.columnContainer}>
            <div
              className={styles.column}
              onClick={() => setSelectProcess("now")}
            >
              <img src={play} alt="Now" />
              <p className={styles.buttonText}>Now</p>
            </div>
            <div
              className={styles.column}
              onClick={() => setSelectProcess("schedule")}
            >
              <img src={calendar} alt="Schedule" />
              <p className={styles.buttonText}>Schedule</p>
            </div>
          </div>
        ) : (
          <>
            <h3>¿Cuándo quieres iniciar el monitoreo?</h3>

            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Select
              className={styles.select}
              options={reportOptions}
              placeholder="Tipo de Reporte"
              value={reportOptions.find((opt) => opt.value === reportType)}
              onChange={(selected) => setReportType(selected?.value || null)}
            />

            <Select
              className={styles.select}
              options={tagOptions}
              placeholder="Etiquetas"
              isMulti
              value={tagOptions.filter((tag) => tags.includes(tag.value))}
              onChange={(selected) =>
                setTags(selected.map((option) => option.value))
              }
            />

            {selectProcess === "schedule" && (
              <>
                <label className={styles.dateLabel}>Select Day:</label>
                <div className={styles.datePickerContainer}>
                  <DayPicker
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    mode="single"
                  />
                </div>

                <input
                  className={styles.input}
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />

                <div className={styles.checkboxLabel}>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    checked={repeatMonthly}
                    onChange={(e) => setRepeatMonthly(e.target.checked)}
                  />
                  <p>Repetir cada mes</p>
                </div>
              </>
            )}
          </>
        )}

        <div className={styles.modalButtons}>
          {selectProcess !== null && (
            <button className={styles.modalButton} onClick={handlerEvent}>
              {selectProcess === "now" ? "Run Now" : "Schedule"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
