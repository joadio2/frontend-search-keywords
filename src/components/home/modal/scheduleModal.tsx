import React from "react";
import styles from "./scheduleModal.module.css";
import calendar from "../../../assets/icon/calendar.webp";
import play from "../../../assets/icon/play.webp";
import Select from "react-select";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Task, ScheduleModalProps } from "../interface/dataFecht";
import { reportOptions, tagOptions } from "./options";

export default function ScheduleModal({
  onClose,
  onNow,
  onSchedule,
}: ScheduleModalProps) {
  const [selectProcess, setSelectProcess] = React.useState<
    "now" | "schedule" | null
  >(null);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = React.useState("12:00");
  const [repeatMonthly, setRepeatMonthly] = React.useState(false);
  const [data, setData] = React.useState<Task>({
    title: "",
    email: "",
    reportType: "",
    tags: [],
    schedule: false,
    repeatMonthly: false,
  });
  const [error, setError] = React.useState<string | null>(null);

  const handleInputChange = (field: keyof Task, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime) {
      setError("Please select a valid date and time.");
      return;
    }
    const [hour, minute] = selectedTime.split(":");
    const scheduled = new Date(selectedDate);
    scheduled.setHours(parseInt(hour, 10));
    scheduled.setMinutes(parseInt(minute, 10));
    const scheduleAt = scheduled.toISOString();
    onSchedule({ ...data, schedule: true, repeatMonthly, scheduleAt });
  };
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    if (
      !data.title ||
      !data.email ||
      !isValidEmail(data.email) ||
      !data.reportType ||
      data.tags.length === 0
    ) {
      setError("All fields are required and email must be valid.");
      return false;
    }

    if (selectProcess === "schedule" && !selectedDate) {
      setError("Please select a valid date.");
      return false;
    }

    if (selectProcess === "schedule" && !selectedTime) {
      setError("Please select a valid time.");
      return false;
    }

    setError(null);
    return true;
  };
  const handlerEvent = () => {
    if (!validateForm()) {
      return;
    }

    if (selectProcess === "now") {
      onNow(data);
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
            {selectProcess === "schedule" && (
              <h3>When do you want to start monitoring?</h3>
            )}
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type="text"
                placeholder="Title Report"
                value={data.title || ""}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
              <input
                className={styles.input}
                type="email"
                placeholder="Email"
                value={data.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              <Select
                className={styles.select}
                options={reportOptions}
                placeholder="Report Type"
                value={reportOptions.find(
                  (opt) => opt.value === data.reportType
                )}
                onChange={(selected) =>
                  handleInputChange("reportType", selected?.value || null)
                }
              />
              <Select
                className={styles.select}
                options={tagOptions}
                placeholder="Tags"
                isMulti
                value={tagOptions.filter((tag) =>
                  data.tags.includes(tag.value)
                )}
                onChange={(selected) =>
                  handleInputChange(
                    "tags",
                    selected.map((option) => option.value)
                  )
                }
              />
            </div>
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
                  <p>Repeat every month</p>
                </div>
              </>
            )}
          </>
        )}

        {error && <p className={styles.error}>{error}</p>}

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
