import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addMonths, subMonths } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";

interface CalendarHeaderProps {
  currentDate?: Date;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  onDateSelect?: (date: Date) => void;
}

const CalendarHeader = ({
  currentDate = new Date(),
  onPrevMonth = () => {},
  onNextMonth = () => {},
  onDateSelect = () => {},
}: CalendarHeaderProps) => {
  const [date, setDate] = useState<Date>(currentDate);

  const handlePrevMonth = () => {
    const newDate = subMonths(date, 1);
    setDate(newDate);
    onPrevMonth();
  };

  const handleNextMonth = () => {
    const newDate = addMonths(date, 1);
    setDate(newDate);
    onNextMonth();
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      onDateSelect(selectedDate);
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-background border-b">
      <h1 className="text-2xl font-bold">Calendar</h1>
      <div className="flex items-center space-x-4 flex-wrap">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevMonth}
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-left font-normal mx-2",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>{format(date, "MMMM yyyy")}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNextMonth}
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Button onClick={() => handleDateSelect(new Date())}>Today</Button>
      </div>
    </header>
  );
};

export default CalendarHeader;
