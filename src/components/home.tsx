import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import MonthlyCalendar from "./MonthlyCalendar";
import EventDialog from "./EventDialog";
import { addMonths, subMonths } from "date-fns";

interface Event {
  id: string;
  title: string;
  description?: string;
  date: Date;
  time: string;
  color: string;
}

const Home = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Team Meeting",
      description: "Weekly team sync",
      date: new Date(),
      time: "10:00",
      color: "bg-blue-500",
    },
    {
      id: "2",
      title: "Lunch with Client",
      description: "Discuss new project requirements",
      date: new Date(),
      time: "12:30",
      color: "bg-green-500",
    },
    {
      id: "3",
      title: "Project Review",
      description: "End of sprint review",
      date: new Date(),
      time: "15:00",
      color: "bg-purple-500",
    },
  ]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handlePrevMonth = () => {
    setCurrentDate((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };

  const handleDateSelect = (date: Date) => {
    setCurrentDate(date);
  };

  const handleAddEvent = (date: Date) => {
    setSelectedEvent(null);
    setSelectedDate(date);
    setIsDialogOpen(true);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const handleSaveEvent = (eventData: Omit<Event, "id">) => {
    if (selectedEvent) {
      // Update existing event
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id ? { ...event, ...eventData } : event,
        ),
      );
    } else {
      // Add new event
      const newEvent = {
        ...eventData,
        id: Date.now().toString(), // Simple ID generation
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onDateSelect={handleDateSelect}
      />

      <div className="flex-1 p-4 overflow-auto">
        <MonthlyCalendar
          currentDate={currentDate}
          events={events}
          onAddEvent={handleAddEvent}
          onEventClick={handleEventClick}
        />
      </div>

      <EventDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        event={selectedEvent}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
};

export default Home;
