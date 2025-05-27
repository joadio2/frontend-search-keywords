import { useState, useMemo } from "react";
import { ScheduledJob } from "../interfaces/even.interfaces";

export function useCalendarLogic(
  events: ScheduledJob[],
  year: number,
  month: number
) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSelect = (day: number) => {
    setSelectedDate(new Date(year, month, day));
  };

  const daysArray = useMemo(() => {
    const arr: (number | null)[] = Array(startDay).fill(null);
    for (let i = 1; i <= daysInMonth; i++) arr.push(i);
    return arr;
  }, [year, month]);

  const selectedEvents = useMemo(() => {
    return events.filter((event) => {
      const eventDate = event.scheduledAt ? new Date(event.scheduledAt) : null;
      return (
        eventDate &&
        selectedDate &&
        eventDate.getDate() === selectedDate.getDate() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  }, [selectedDate, events]);

  return { daysArray, handleSelect, selectedDate, selectedEvents };
}
