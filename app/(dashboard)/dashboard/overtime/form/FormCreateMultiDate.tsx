"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format, eachDayOfInterval } from "date-fns";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  Check,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "../../attendance/today/columns";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

export default function FormCreateMultiDate({
  employees,
}: {
  employees: User[];
}) {
  const [rangeDate, setRangeDate] = useState<{
    from: number | undefined;
    to: number | undefined;
  }>({
    from: new Date().getTime(),
    to: addDays(new Date(), 7).getTime(),
  });
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [availableSearch, setAvailableSearch] = useState("");
  const [selectedSearch, setSelectedSearch] = useState("");
  const [showInputs, setShowInputs] = useState(false);
  const [overtimeInputs, setOvertimeInputs] = useState<Array<{
    date: number;
    startTime: string;
    endTime: string;
  }>>([]);

  // Function to generate overtime inputs based on date range
  const handleDisplayInputs = () => {
    if (!rangeDate.from || !rangeDate.to || !selectedEmployees[0]) {
      return;
    }

    const dateRange = eachDayOfInterval({
      start: new Date(rangeDate.from),
      end: new Date(rangeDate.to),
    });

    const inputs = dateRange.map((date) => ({
      date: date.getTime(),
      startTime: "",
      endTime: "",
    }));

    setOvertimeInputs(inputs);
    setShowInputs(true);
  };

  const selectedEmployee = employees.find(
    (employee) => employee.id === selectedEmployees[0]
  );

  console.log("employees", employees);
  return (
    <div>
      <Card>
        <form>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              {/* Employee Selection */}
              <div className="space-y-2">
                <Label>Employee</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {selectedEmployees[0]
                        ? employees.find(
                            (employee) => employee.id === selectedEmployees[0]
                          )?.name
                        : "Select employee..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search employee..." />
                      <CommandEmpty>No employee found.</CommandEmpty>
                      <CommandGroup>
                        <ScrollArea className="h-[200px]">
                          {employees.map((employee) => (
                            <CommandItem
                              key={employee.id}
                              onSelect={() => {
                                setSelectedEmployees([employee.id]);
                                // close popover
                                document.dispatchEvent(
                                  new Event("keydown.escape")
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedEmployees[0] === employee.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {employee.username} - {employee.name}
                            </CommandItem>
                          ))}
                        </ScrollArea>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Select Reason for overtime */}
            <div className="space-y-1">
              <Label htmlFor="reason">Reaseon</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vacation">Vacation</SelectItem>
                  <SelectItem value="sick">Sick</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Select Date */}
            <div className="space-y-1">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !rangeDate.from && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="w-4 h-4 mr-2" />{" "}
                    {rangeDate?.from ? (
                      rangeDate.to ? (
                        <>
                          {format(new Date(rangeDate.from), "LLL dd, y")} -{" "}
                          {format(new Date(rangeDate.to), "LLL dd, y")}
                        </>
                      ) : (
                        format(new Date(rangeDate.from), "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="range"
                    defaultMonth={new Date()}
                    selected={{
                      from: rangeDate.from
                        ? new Date(rangeDate.from)
                        : undefined,
                      to: rangeDate.to ? new Date(rangeDate.to) : undefined,
                    }}
                    onSelect={(range) =>
                      setRangeDate({
                        from: range?.from?.getTime(),
                        to: range?.to?.getTime(),
                      })
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Remarks */}
            <div className="space-y-1">
              <Label htmlFor="remarks">
                Remarks <span className="text-red-500 text-lg">*</span>
              </Label>
              <Textarea id="remarks" />
            </div>

            <div className="space-y-1">
              <Button 
                type="button" 
                variant={"secondary"}
                onClick={handleDisplayInputs}
                disabled={!selectedEmployees[0] || !rangeDate.from || !rangeDate.to}
              >
                Display
              </Button>
            </div>

            {showInputs && selectedEmployee && (
              <div className="space-y-4 mt-4">
                <div className="text-sm font-medium">
                  Overtime Details for {selectedEmployee.name}
                </div>
                <div className="space-y-2">
                  {overtimeInputs.map((input, index) => (
                    <div key={input.date} className="grid grid-cols-[2fr,1fr,1fr] gap-4 items-center text-sm">
                      <div className="font-medium">
                        {format(new Date(input.date), "EEE, dd MMM yyyy")}
                      </div>
                      <div>
                        <Input
                          type="time"
                          value={input.startTime}
                          onChange={(e) => {
                            const newInputs = [...overtimeInputs];
                            newInputs[index].startTime = e.target.value;
                            setOvertimeInputs(newInputs);
                          }}
                          className="h-8"
                        />
                      </div>
                      <div>
                        <Input
                          type="time"
                          value={input.endTime}
                          onChange={(e) => {
                            const newInputs = [...overtimeInputs];
                            newInputs[index].endTime = e.target.value;
                            setOvertimeInputs(newInputs);
                          }}
                          className="h-8"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button>Submit Overtime</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
