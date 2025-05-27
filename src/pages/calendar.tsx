import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Calendar.module.css";
import Nav from "../components/home/nav";
import { useCalendarLogic } from "../components/calendar/fuctions/useCalendar";
import { ScheduledJob } from "../components/calendar/interfaces/even.interfaces";
import { getId } from "../components/home/fuction/getId";
import Loader from "./loader";

export default function Calendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<ScheduledJob[]>([]);

  const { daysArray, handleSelect, selectedEvents, selectedDate } =
    useCalendarLogic(events, year, month);

  useEffect(() => {
    const fetchEvents = async () => {
      const userId = await getId();

      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.API_URL}/schedule-task/${userId}`
        );
        const data: ScheduledJob[] = response.data.data;
        console.log("event", data);

        const filtered = data.filter((event) => {
          const date = event.scheduledAt ? new Date(event.scheduledAt) : null;
          return (
            date && date.getMonth() === month && date.getFullYear() === year
          );
        });

        setEvents(filtered);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [month, year]);

  if (loading) return <Loader />;

  return (
    <section>
      <Nav />
      <div className={styles.container}>
        <div className={styles.calendar}>
          <div className={styles.header}>
            {today.toLocaleString("default", { month: "long" })} {year}
          </div>
          <div className={styles.grid}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className={styles.dayName}>
                {d}
              </div>
            ))}
            {daysArray.map((day, index) => {
              const eventsForDay = events.filter((event) => {
                const eventDate = event.scheduledAt
                  ? new Date(event.scheduledAt)
                  : null;
                return (
                  day &&
                  eventDate &&
                  eventDate.getDate() === day &&
                  eventDate.getMonth() === month &&
                  eventDate.getFullYear() === year
                );
              });

              return (
                <div
                  key={index}
                  className={`${styles.day} ${
                    day && selectedDate?.getDate() === day
                      ? styles.selected
                      : ""
                  }`}
                  onClick={() => day && handleSelect(day)}
                >
                  {day ?? ""}
                  {eventsForDay.length > 0 && (
                    <div className={styles.eventCount}>
                      {eventsForDay.length}{" "}
                      {eventsForDay.length === 1 ? "evento" : "eventos"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {selectedEvents.length > 0 && (
          <div className={styles.eventsList}>
            <h3>Eventos para el {selectedDate?.toLocaleDateString()}</h3>
            {selectedEvents.map((event, index) => {
              const eventDate = event.scheduledAt
                ? new Date(event.scheduledAt)
                : null;

              const normalizedDate = eventDate
                ? eventDate.toLocaleString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Sin fecha";

              return (
                <div key={index} className={styles.event}>
                  <p>
                    <strong>{event.title}</strong>
                  </p>
                  <p>
                    <strong>Scheduled for:</strong> {normalizedDate}
                  </p>
                  <p>
                    <strong>Repite mensualmente:</strong>{" "}
                    {event.repeatMonthly ? "Sí" : "No"}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
