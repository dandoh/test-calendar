import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  getDay,
} from "date-fns";
import DayCell from "./DayCell";
import { cn } from "../lib/utils";

interface Event {
  id: string;
  title: string;
  time: string;
  color: string;
}

interface MonthlyCalendarProps {
  currentDate?: Date;
  events?: Event[];
  onAddEvent?: (date: Date) => void;
  onEventClick?: (event: Event) => void;
}

const MonthlyCalendar = ({
  currentDate = new Date(),
  events = [
    { id: "1", title: "Team Meeting", time: "10:00 AM", color: "bg-blue-500" },
    {
      id: "2",
      title: "Lunch with Client",
      time: "12:30 PM",
      color: "bg-green-500",
    },
    {
      id: "3",
      title: "Project Review",
      time: "3:00 PM",
      color: "bg-purple-500",
    },
    { id: "4", title: "Gym Session", time: "6:00 PM", color: "bg-orange-500" },
  ],
  onAddEvent = () => {},
  onEventClick = () => {},
}: MonthlyCalendarProps) => {
  const [displayDate, setDisplayDate] = useState(currentDate);

  // Generate days for the current month view
  const monthStart = startOfMonth(displayDate);
  const monthEnd = endOfMonth(displayDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Calculate days from previous month to fill the first week
  const startDay = getDay(monthStart);

  // Create a 6-row calendar (42 days) to ensure consistent height
  const calendarDays = [];

  // Add days from previous month
  const prevMonthDays = startDay;
  for (let i = prevMonthDays - 1; i >= 0; i--) {
    const day = new Date(monthStart);
    day.setDate(day.getDate() - (i + 1));
    calendarDays.push(day);
  }

  // Add days from current month
  calendarDays.push(...monthDays);

  // Add days from next month to fill remaining slots (up to 42 days total)
  const remainingDays = 42 - calendarDays.length;
  for (let i = 1; i <= remainingDays; i++) {
    const day = new Date(monthEnd);
    day.setDate(day.getDate() + i);
    calendarDays.push(day);
  }

  // Get events for a specific day
  const getEventsForDay = (date: Date) => {
    // In a real app, this would filter events based on the actual date
    // For this scaffold, we'll just randomly assign events to days
    const dayOfMonth = date.getDate();
    return events.filter((event) => dayOfMonth % 4 === parseInt(event.id) % 4);
  };

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
        {weekdays.map((day, index) => (
          <div
            key={index}
            className="py-2 text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 grid-rows-6 h-[calc(100%-40px)]">
        {calendarDays.map((day, index) => {
          const dayEvents = getEventsForDay(day);
          return (
            <DayCell
              key={index}
              date={day.getDate()}
              isCurrentMonth={isSameMonth(day, displayDate)}
              isToday={isToday(day)}
              events={dayEvents}
              onAddEvent={() => onAddEvent(day)}
              onEventClick={onEventClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MonthlyCalendar;
