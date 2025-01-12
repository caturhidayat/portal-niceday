"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function FormSelectData() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );

  return (
    <form>
      <div className="flex flex-col space-y-4">
        <Label>Select Range date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              Select Date
              <CalendarIcon className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex">
        <Label>Employee</Label>
        {/* <Textarea>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>John Doe</span>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>John Doe</span>
            </div>
          </div>
        </Textarea> */}
        <ScrollArea className="h-96 ">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
            {tags.map((tag) => (
              <>
                <div key={tag} className="text-sm cursor-pointer">
                  {tag}
                </div>
                <Separator className="my-2" />
              </>
            ))}
          </div>
        </ScrollArea>
      </div>
    </form>
  );
}
