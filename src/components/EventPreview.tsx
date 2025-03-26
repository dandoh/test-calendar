import React from "react";

interface EventPreviewProps {
  title?: string;
  time?: string;
  color?: string;
  onClick?: () => void;
}

const EventPreview = ({
  title = "Meeting with Team",
  time = "10:00 AM",
  color = "#4f46e5", // Indigo color by default
  onClick = () => {},
}: EventPreviewProps) => {
  return (
    <div
      className="flex items-center px-2 py-1 mb-1 rounded text-xs truncate cursor-pointer bg-white hover:opacity-90 transition-opacity"
      style={{ borderLeft: `3px solid ${color}` }}
      onClick={onClick}
    >
      <div className="flex-1 truncate">
        <span className="font-medium">{title}</span>
        <span className="ml-1 text-gray-500">{time}</span>
      </div>
    </div>
  );
};

export default EventPreview;
