"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useState } from "react";

export default function FormEntryAttendance() {
  const [date, setDate] = useState<Date>();
  return (
    <div className="grid">
      <form className="grid space-y-4">
        <div className="flex flex-col">
          <Label>Employee</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Select</Button>
            </PopoverTrigger>
            <PopoverContent>
              <p>Content</p>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col">
          <Label>Attendance Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {date ? (
                  <span>{format(date, "eeee, dd MMM-yyyy")}</span>
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                selected={date}
                mode="single"
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <Label>Check In</Label>
            <Input type="time" />
          </div>
          <div className="col-span-1">
            <Label>Check Out</Label>
            <Input type="time" />
          </div>
        </div>
        <div className="flex flex-col">
          <Label>Employee</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Select</Button>
            </PopoverTrigger>
            <PopoverContent>
              <p>Content</p>
            </PopoverContent>
          </Popover>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
