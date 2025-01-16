"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  FileSpreadsheet,
  Eye,
  CalendarIcon,
  ChevronRight,
  ChevronsRight,
  ChevronsLeft,
  ChevronLeft,
  ShieldX,
} from "lucide-react";
import { useActionState, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Attendance, User } from "../../attendance/today/columns";
import generateReportAttendance from "./action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock data for employees
const employees = [
  { id: "PY-0909", name: "Abdul Azis" },
  { id: "PY-0922", name: "Abdul Azis" },
  { id: "340001", name: "Abdul Syukur" },
  { id: "PY-ID809", name: "Achmad Nuri Anwar" },
  { id: "PY-ID919", name: "Ade Nuryono" },
  { id: "PY-D488", name: "Ari Mardani" },
  { id: "PY-ID869", name: "Artemio Parlinggolan Simanjuntak" },
  { id: "PY-ID086", name: "Atika Yustin" },
  { id: "PY-0924", name: "Ahmad Abdul Hafiz" },
];

const initialState = {
  success: false,
  message: "",
  inputs: {
    userId: [],
    startDate: "",
    endDate: "",
    attendanceStatus: "",
    groupBy: "",
    showLegend: "",
  },
};

export default function SelectDate({ employees }: { employees: User[] }) {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [rangeDate, setRangeDate] = useState<{
    from: number | undefined;
    to: number | undefined;
  }>({
    from: new Date().getTime(),
    to: addDays(new Date(), 7).getTime(),
  });
  const [groupBy, setGroupBy] = useState("date");
  const [showLegend, setShowLegend] = useState(false);
  const [availableSearch, setAvailableSearch] = useState("");
  const [selectedSearch, setSelectedSearch] = useState("");

  const [attendanceStatus, setAttendanceStatus] = useState<string | null>(null);

  // const action = async (data: FormData) => {
  //   console.log("selectedEmployees : ", selectedEmployees);
  //   console.log("rangeDate : ", rangeDate);
  //   console.log("attendance status : ", attendanceStatus);
  //   console.log("groupBy : ", groupBy);
  //   console.log("showLegend : ", showLegend);
  // };

  const [state, action, isPending] = useActionState(
    generateReportAttendance,
    initialState
  );

  return (
    <div className="bg-base-100">
      <main className="max-w-7xl mx-auto p-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">Report Filter</h2>

          <form action={action}>
            <div className="space-y-6">
              {/* Employee Selection */}
              <div className="space-y-2">
                <Label>Employee ({employees.length})</Label>
                {selectedEmployees.map((employeeId, index) => (
                  <input
                    key={employeeId}
                    type="hidden"
                    name="selectedEmployees[]"
                    value={employeeId}
                  />
                ))}
                <div className="flex gap-4">
                  <div className="w-[45%] border rounded-md">
                    <div className="p-2 border-b">
                      <div className="space-y-2">
                        <span className="text-sm font-medium">
                          Available Employees
                        </span>
                        <Input
                          type="text"
                          placeholder="Search available employees..."
                          value={availableSearch}
                          onChange={(e) => setAvailableSearch(e.target.value)}
                          className="h-8"
                        />
                      </div>
                    </div>
                    <ScrollArea className="h-[200px] p-2">
                      {employees
                        .filter(
                          (employee) => !selectedEmployees.includes(employee.id)
                        )
                        .filter(
                          (employee) =>
                            employee.name
                              .toLowerCase()
                              .includes(availableSearch.toLowerCase()) ||
                            employee.username
                              .toLowerCase()
                              .includes(availableSearch.toLowerCase())
                        )
                        .map((employee) => (
                          <div
                            key={employee.id}
                            className="flex items-center justify-between py-1 px-2 hover:bg-gray-100 rounded cursor-pointer"
                            onClick={() => {
                              setSelectedEmployees([
                                ...selectedEmployees,
                                employee.id,
                              ]);
                            }}
                          >
                            <span className="text-sm">
                              {employee.username} - {employee.name}
                            </span>
                            <ChevronRight className="h-4 w-4 text-gray-500" />
                          </div>
                        ))}
                    </ScrollArea>
                  </div>

                  <div className="flex flex-col justify-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const availableEmployees = employees
                          .filter((e) => !selectedEmployees.includes(e.id))
                          .map((e) => e.id);
                        setSelectedEmployees([
                          ...selectedEmployees,
                          ...availableEmployees,
                        ]);
                      }}
                    >
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setSelectedEmployees([])}
                    >
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="w-[45%] border rounded-md">
                    <div className="p-2 border-b">
                      <div className="space-y-2">
                        <span className="text-sm font-medium">
                          Selected Employees
                        </span>
                        <Input
                          type="text"
                          placeholder="Search selected employees..."
                          value={selectedSearch}
                          onChange={(e) => setSelectedSearch(e.target.value)}
                          className="h-8"
                        />
                      </div>
                    </div>
                    <ScrollArea className="h-[200px] p-2">
                      {selectedEmployees
                        .map((id) => employees.find((e) => e.id === id))
                        .filter((employee) => employee !== undefined)
                        .filter(
                          (employee) =>
                            employee.name
                              .toLowerCase()
                              .includes(selectedSearch.toLowerCase()) ||
                            employee.username
                              .toLowerCase()
                              .includes(selectedSearch.toLowerCase())
                        )
                        .map((employee) => (
                          <div
                            key={employee.id}
                            className="flex items-center justify-between py-1 px-2 hover:bg-gray-100 rounded cursor-pointer"
                            onClick={() => {
                              setSelectedEmployees(
                                selectedEmployees.filter(
                                  (empId) => empId !== employee.id
                                )
                              );
                            }}
                          >
                            <ChevronLeft className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">
                              {employee.username} - {employee.name}
                            </span>
                          </div>
                        ))}
                    </ScrollArea>
                  </div>
                </div>
              </div>

              {/* Period Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Period</Label>
                  <div className="flex gap-2 items-center">
                    {/* Date Picker for select date range periode */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !rangeDate.from && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="w-4 h-4 mr-2" />{" "}
                          {rangeDate?.from ? (
                            rangeDate.to ? (
                              <>
                                {format(new Date(rangeDate.from), "LLL dd, y")}{" "}
                                - {format(new Date(rangeDate.to), "LLL dd, y")}
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
                            to: rangeDate.to
                              ? new Date(rangeDate.to)
                              : undefined,
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
                </div>

                <div className="space-y-2">
                  <Label>Attendance Status</Label>
                  <Select
                    defaultValue="not-specified"
                    onValueChange={setAttendanceStatus}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not-specified">
                        Not Specified
                      </SelectItem>
                      <SelectItem value="present">Present</SelectItem>
                      <SelectItem value="absent">Absent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Group By and Legend */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Group by</Label>
                  <RadioGroup
                    value={groupBy}
                    onValueChange={setGroupBy}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="date" id="date" />
                      <Label htmlFor="date">Date</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="employee" id="employee" />
                      <Label htmlFor="employee">Employee</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show-legend"
                    checked={showLegend}
                    onCheckedChange={(checked) => setShowLegend(!!checked)}
                  />
                  <Label htmlFor="show-legend">Show Legend</Label>
                </div>

                <div>
                  {state.errors && (
                    <Alert variant={"destructive"} className="mt-4">
                      <ShieldX className="h-4 w-4" />
                      <AlertTitle>Error!</AlertTitle>
                      <AlertDescription>{state.message}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              {/* Hidden inputs for other form data */}
              <input
                type="hidden"
                name="rangeFrom"
                value={rangeDate.from?.toString() || ""}
              />
              <input
                type="hidden"
                name="rangeTo"
                value={rangeDate.to?.toString() || ""}
              />
              <input
                type="hidden"
                name="attendanceStatus"
                value={attendanceStatus || ""}
              />
              <input type="hidden" name="groupBy" value={groupBy} />
              <input
                type="hidden"
                name="showLegend"
                value={showLegend ? "true" : "false"}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 mt-6">
              <Button type="submit" disabled={isPending}>
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Export to MS Excel
              </Button>

              {/* <Button>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button> */}
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
}
