import React from "react";
import { cn } from "../lib/utils";

interface Event {
  id: string;
  title: string;
  time: string;
  color: string;
}

// Define EventPreview component inline since there's an issue with importing it
const EventPreview = ({
  title = "Event",
  time = "12:00 PM",
  color = "bg-blue-500",
}: {
  title: string;
  time: string;
  color: string;
}) => {
  return (
    <div className="flex items-center space-x-2 text-xs p-1 rounded overflow-hidden">
      <div className={`${color} w-2 h-full rounded-full flex-shrink-0`}></div>
      <div className="flex-1 truncate">
        <div className="font-medium truncate">{title}</div>
        <div className="text-gray-500">{time}</div>
      </div>
    </div>
  );
};

interface DayCellProps {
  date: number;
  isCurrentMonth?: boolean;
  isToday?: boolean;
  events?: Event[];
  onAddEvent?: () => void;
  onEventClick?: (event: Event) => void;
}

const DayCell = ({
  date = 1,
  isCurrentMonth = true,
  isToday = false,
  events = [
    { id: "1", title: "Meeting", time: "9:00 AM", color: "bg-blue-500" },
    { id: "2", title: "Lunch", time: "12:30 PM", color: "bg-green-500" },
  ],
  onAddEvent = () => {},
  onEventClick = () => {},
}: DayCellProps) => {
  return (
    <div
      className={
        cn(
          "h-[133px] border border-gray-200 p-2 overflow-hidden ",
          !isCurrentMonth && " text-gray-400",
          isToday && "ring-2 ring-blue-500",
        ) + " bg-[#a64b4b]"
      }
      onClick={() => onAddEvent()}
    >
      <div className="flex justify-between items-start">
        <span
          className={cn(
            "font-medium text-sm",
            isToday &&
              "bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center",
          )}
        >
          {date}
        </span>
      </div>
      <div className="mt-1 space-y-1 max-h-[100px] overflow-y-auto">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={(e) => {
              e.stopPropagation();
              onEventClick(event);
            }}
          >
            <EventPreview
              title={event.title}
              time={event.time}
              color={event.color}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayCell;
