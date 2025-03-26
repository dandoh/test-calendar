import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Calendar } from "../components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Clock, X } from "lucide-react";
import { cn } from "../lib/utils";

interface Event {
  id: string;
  title: string;
  description?: string;
  date: Date;
  time: string;
  color: string;
}

interface EventDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  event?: Event | null;
  onSave?: (event: Omit<Event, "id">) => void;
  onDelete?: (id: string) => void;
}

const EventDialog = ({
  open = true,
  onOpenChange = () => {},
  event = null,
  onSave = () => {},
  onDelete = () => {},
}: EventDialogProps) => {
  const [title, setTitle] = useState(event?.title || "");
  const [description, setDescription] = useState(event?.description || "");
  const [date, setDate] = useState<Date | undefined>(event?.date || new Date());
  const [time, setTime] = useState(event?.time || "12:00");
  const [color, setColor] = useState(event?.color || "bg-blue-500");

  const isNewEvent = !event?.id;
  const dialogTitle = isNewEvent ? "Add New Event" : "Edit Event";

  const handleSave = () => {
    if (!title.trim() || !date || !time) return;

    onSave({
      title,
      description,
      date,
      time,
      color,
    });

    onOpenChange(false);
  };

  const handleDelete = () => {
    if (event?.id) {
      onDelete(event.id);
      onOpenChange(false);
    }
  };

  const colorOptions = [
    { name: "Blue", value: "bg-blue-500" },
    { name: "Green", value: "bg-green-500" },
    { name: "Red", value: "bg-red-500" },
    { name: "Purple", value: "bg-purple-500" },
    { name: "Yellow", value: "bg-yellow-500" },
    { name: "Pink", value: "bg-pink-500" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              placeholder="Event title"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              placeholder="Event description (optional)"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <div className="col-span-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Time
            </Label>
            <div className="col-span-3 flex items-center">
              <Clock className="mr-2 h-4 w-4 text-gray-500" />
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Color</Label>
            <div className="col-span-3 flex flex-wrap gap-2">
              {colorOptions.map((colorOption) => (
                <button
                  key={colorOption.value}
                  type="button"
                  className={cn(
                    "w-8 h-8 rounded-full border-2",
                    colorOption.value,
                    color === colorOption.value
                      ? "border-black"
                      : "border-transparent",
                  )}
                  onClick={() => setColor(colorOption.value)}
                  aria-label={`Select ${colorOption.name} color`}
                />
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          {!isNewEvent && (
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {isNewEvent ? "Add Event" : "Save Changes"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
