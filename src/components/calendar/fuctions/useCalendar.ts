// hooks/useCalendarLogic.ts
import { useState } from "react";
import { ScheduledJob } from "../interfaces/even.interfaces";
export function useCalendarLogic(
  events: ScheduledJob[],
  year: number,
  month: number
) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<ScheduledJob[]>([]);

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const daysArray = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );

  const handleSelect = (day: number) => {
    const selected = new Date(year, month, day);
    setSelectedDate(selected);

    const eventsForDay = events.filter((event) => {
      const eventDate = event.nextRunAt ? new Date(event.nextRunAt) : null;
      return (
        eventDate &&
        eventDate.getDate() === day &&
        eventDate.getMonth() === month &&
        eventDate.getFullYear() === year
      );
    });

    setSelectedEvents(eventsForDay);
  };

  return {
    daysArray,
    handleSelect,
    selectedEvents,
    selectedDate,
  };
}
