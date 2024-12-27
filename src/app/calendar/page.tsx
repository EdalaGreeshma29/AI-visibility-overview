"use client";
import { useState, useEffect } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";


interface DateRangeJson {
  startDate: string;
  endDate: string;
  numberOfDays: number;
  dateList: string[];
}

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | [Date, Date] | null>(null);
  const [jsonData, setJsonData] = useState<DateRangeJson | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Calculate the date range limits
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() - 7);
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 7);

  // Function to generate dates between two dates
  const getDatesBetween = (startDate: Date, endDate: Date): string[] => {
    const dates: string[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  // Function to update JSON data
  const updateJsonData = (start: Date, end: Date) => {
    const dateList = getDatesBetween(start, end);
    const numberOfDays = dateList.length;

    const jsonOutput: DateRangeJson = {
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0],
      numberOfDays,
      dateList
    };

    setJsonData(jsonOutput);
    console.log('Date Range JSON:', jsonOutput);
  };

  useEffect(() => {
    setHydrated(true);

    // Add custom styles to match Google Calendar
    const style = document.createElement('style');
    style.textContent = `
      .react-calendar {
        width: 100% !important;
        max-width: none;
        background: white;
        border: none;
        font-family: 'Google Sans',Roboto,Arial,sans-serif;
      }
      .react-calendar__navigation {
        height: 64px;
        margin-bottom: 0;
        background: #f1f3f4;
        display: flex;
        align-items: center;
        padding: 0 16px;
      }
      .react-calendar__navigation button {
        min-width: 32px;
        background: none;
        font-size: 24px;
        color: #5f6368;
      }
      .react-calendar__navigation button:enabled:hover,
      .react-calendar__navigation button:enabled:focus {
        background-color: #e8eaed;
        border-radius: 50%;
      }
      .react-calendar__navigation__label {
        font-weight: 400;
        font-size: 16px;
        color: #3c4043;
      }
      .react-calendar__month-view__weekdays {
        background: #fff;
        text-align: center;
        color: #70757a;
        font-weight: 500;
        font-size: 11px;
        padding: 8px 0;
      }
      .react-calendar__month-view__days__day {
        color: #3c4043;
        padding: 12px;
        font-size: 14px;
      }
      .react-calendar__month-view__days__day--weekend {
        color: #d50000;
      }
      .react-calendar__tile {
        height: 100px;
        border: 1px solid #e0e0e0;
        background: none;
        padding: 8px;
        text-align: left;
        vertical-align: top;
      }
      .react-calendar__tile:enabled:hover,
      .react-calendar__tile:enabled:focus {
        background-color: #f8f9fa;
      }
      .react-calendar__tile--now {
        background: #fafafa;
      }
      .react-calendar__tile--now:enabled:hover,
      .react-calendar__tile--now:enabled:focus {
        background: #f8f9fa;
      }
      .react-calendar__tile--active {
        background: #e8f0fe;
        color: #1a73e8;
      }
      .react-calendar__tile--active:enabled:hover,
      .react-calendar__tile--active:enabled:focus {
        background: #e8f0fe;
      }
      .react-calendar__tile--range {
        background: #e8f0fe;
        color: #1a73e8;
      }
      .calendar-container {
        height: 100vh;
        display: flex;
        flex-direction: column;
      }
      .calendar-header {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        background: white;
        border-bottom: 1px solid #e0e0e0;
      }
      .calendar-header h1 {
        font-size: 22px;
        color: #3c4043;
        font-weight: 400;
        margin: 0;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (Array.isArray(value)) {
      const [start, end] = value;
      if (start && end) {
        const adjustedStart = new Date(Math.max(minDate.getTime(), start.getTime()));
        const adjustedEnd = new Date(Math.min(maxDate.getTime(), end.getTime()));

        const diffInDays = Math.abs((adjustedEnd.getTime() - adjustedStart.getTime()) / (1000 * 60 * 60 * 24));

        if (diffInDays > 7) {
          const newStartDate = new Date(adjustedStart);
          const newEndDate = new Date(adjustedStart);
          newEndDate.setDate(adjustedStart.getDate() + 6);
          setSelectedDate([newStartDate, newEndDate]);
          updateJsonData(newStartDate, newEndDate);
        } else {
          setSelectedDate([adjustedStart, adjustedEnd]);
          updateJsonData(adjustedStart, adjustedEnd);
        }
      } else {
        setSelectedDate(null);
        setJsonData(null);
      }
    } else if (value instanceof Date) {
      const adjustedDate = new Date(
        Math.min(
          maxDate.getTime(),
          Math.max(minDate.getTime(), value.getTime())
        )
      );
      setSelectedDate(adjustedDate);
      updateJsonData(adjustedDate, adjustedDate);
    }
  };

  if (!hydrated) return null;

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h1>Calendar</h1>
      </div>
      <Calendar
        selectRange
        value={selectedDate || undefined}
        onChange={handleDateChange}
        showNavigation={true}
        showNeighboringMonth={true}
        view="month"
      />
      {Array.isArray(selectedDate) ? (
        <p className="selected-range">
          Selected: {selectedDate[0].toDateString()} - {selectedDate[1].toDateString()}
        </p>
      ) : selectedDate ? (
        <p className="selected-date">Selected: {selectedDate.toDateString()}</p>
      ) : null}
    </div>
  );
};

export default CalendarPage;