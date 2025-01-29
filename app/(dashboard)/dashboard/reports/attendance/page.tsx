"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Download, Search } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export default function AttendanceReport() {
  const [date, setDate] = useState<DateRange | undefined>();
  const [showPreview, setShowPreview] = useState(false);

  const handleGetData = () => {
    if (date?.from && date?.to) {
      setShowPreview(true);
    }
  };

  const handlePreview = () => {
    if (!date?.from || !date?.to) return;

    const startDate = Date.parse(date.from.toISOString());
    const endDate = Date.parse(date.to.toISOString());
    const url = `/reports/attendance/preview?startDate=${startDate}&endDate=${endDate}`;

    // window.open(
    //   url,
    //   "_blank",
    //   "width=screen.width,height=screen.height,menubar=no,toolbar=no,location=no,status=no,scrollbars=yes,resizable=yes"
    // );
    window.open(
      url,
      "_blank",
      `width=1600,height=1200,menubar=no,toolbar=no,location=no,status=no,scrollbars=yes,resizable=yes`
    );
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Attendance Report</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className={cn("grid gap-2")}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-[300px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
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
            <Button className="bg-teal-700 hover:bg-teal-800" onClick={handleGetData}>
              <Download className="mr-2 h-4 w-4" />
              Get Data
            </Button>
          </div>

          {showPreview && (
            <div className="space-x-4">
              <Button className="bg-violet-600 hover:bg-violet-700" onClick={handlePreview}>
                <Search className="mr-2 h-4 w-4" />
                Preview Report
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
