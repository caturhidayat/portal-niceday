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
import { format } from "date-fns";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "../../attendance/today/columns";
import { AttendanceData, getAttendanceData } from "../actions";

export default function FormCreateMultiEmployee({
  employees,
}: {
  employees: User[];
}) {
  const [date, setDate] = useState<Date>();
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [availableSearch, setAvailableSearch] = useState("");
  const [selectedSearch, setSelectedSearch] = useState("");
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDisplay = async () => {
    if (!date || selectedEmployees.length === 0) {
      alert("Please select date and employees");
      return;
    }

    setIsLoading(true);
    try {
      const result = await getAttendanceData(selectedEmployees, date);

      if (!result.success) {
        throw new Error(result.message);
      }

      setAttendanceData(result.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to fetch attendance data"
      );
    } finally {
      setIsLoading(false);
    }
  };

  console.log("employees", employees);
  return (
    <div>
      <Card>
        <form>
          <CardContent className="space-y-2">
            <div className="space-y-1">
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
                    className="w-full justify-start text-left font-normal"
                  >
                    {date ? (
                      <span>{format(date, "eeee, dd MMM-yyyy")}</span>
                    ) : (
                      <span className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Pick a date
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Remarks  */}
            <div className="space-y-1">
              <Label htmlFor="remarks">
                Remarks <span className="text-red-500 text-lg">*</span>
              </Label>
              <Textarea id="remarks" />
            </div>

            <div>
              <Button
                variant={"secondary"}
                onClick={handleDisplay}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Display"}
              </Button>
            </div>

            {/* <div>
              {attendanceData.length !== 0 ? (
                <OvertimeData data={attendanceData} />
              ) : null}
            </div> */}
          </CardContent>
          {/* <CardFooter>
            <Button>Submit Overtime</Button>
          </CardFooter> */}
        </form>
      </Card>
    </div>
  );
}
