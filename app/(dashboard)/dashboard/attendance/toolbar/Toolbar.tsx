"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, RotateCcw, Search, Table2 } from "lucide-react";
import { useState } from "react";
import { Departments } from "../../employees/table/columns";

import { AttendanceData, ShiftGroup } from "../actions";

import { toast } from "sonner";
import { MultiSelect } from "@/components/ui/multi-select";

// Definisikan tipe untuk User
type User = {
  id: string;
  name: string;
  username: string;
  departmentId?: number;
};

export default function Toolbar({
  shiftGroups,
  departments,
  users,
  onFilterAttendance,
}: {
  shiftGroups: ShiftGroup[];
  departments: Departments[];
  users: User[];
  onFilterAttendance: (
    startDate?: number,
    endDate?: number,
    departmentId?: string,
    shiftGroupId?: string,
    userIds?: string[]
  ) => Promise<AttendanceData[]>;
}) {
  // Changed state type from Date to number to store epoch milliseconds
  const [startDate, setStartDate] = useState<number>();
  const [endDate, setEndDate] = useState<number>();
  const [shiftGroupId, setShiftGroupId] = useState<string>("");
  const [departmentId, setDepartmentId] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Filter user berdasarkan departemen yang dipilih
  const filteredUsers = departmentId
    ? users.filter((user) => user.departmentId === parseInt(departmentId))
    : users;

  async function handleViewData() {
    if (!startDate || !endDate) {
      toast.error("Please select start and end date");
      return;
    }

    setLoading(true);
    try {
      // Memanggil fungsi filter attendance dari server component
      await onFilterAttendance(
        startDate,
        endDate,
        departmentId,
        shiftGroupId,
        selectedUsers.length > 0 ? selectedUsers : undefined
      );

      toast.success("Get attendance data successfully");
    } catch (error) {
      console.error("Failed to get attendance data:", error);
      toast.error("Failed to get attendance data");
    } finally {
      setLoading(false);
    }
  }

  // Reset state
  const handleReset = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setShiftGroupId("");
    setDepartmentId("");
    setSelectedUsers([]);
  };

  return (
    <Card className="h-full w-full">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex flex-col space-y-6 h-full overflow-y-auto pr-2" style={{ maxHeight: 'calc(100vh - 120px)' }}>
          {/* Department */}
          <div className="space-y-2">
            <Label>Department</Label>
            <Select
              value={departmentId}
              onValueChange={setDepartmentId}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {departments.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.id.toString()}
                    >
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Shift Group */}
          <div className="space-y-2">
            <Label>Shift Group</Label>
            <Select
              value={shiftGroupId}
              onValueChange={setShiftGroupId}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select shift group" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {shiftGroups.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.id.toString()}
                    >
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Employee Selection */}
          <div className="space-y-2">
            <Label>Employee</Label>
            <MultiSelect
              options={filteredUsers.map((user) => ({
                label: user.name || user.username,
                value: user.id,
              }))}
              selected={selectedUsers}
              onChange={setSelectedUsers}
              placeholder="Select employee"
              className="w-full"
            />
          </div>

          <Separator />

          {/* Date Selection */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>From Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? (
                      format(new Date(startDate), "PPP")
                    ) : (
                      <span>Pick start date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate ? new Date(startDate) : undefined}
                    onSelect={(val) => val && setStartDate(val.getTime())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>To Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? (
                      format(new Date(endDate), "PPP")
                    ) : (
                      <span>Pick end date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate ? new Date(endDate) : undefined}
                    onSelect={(val) => val && setEndDate(val.getTime())}
                    initialFocus
                    disabled={(date) => {
                      return (
                        date < new Date(Number(startDate)) ||
                        startDate === undefined
                      );
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-col space-y-2 mt-auto">
            <Button
              // className="w-full bg-violet-600 text-white hover:bg-violet-700 py-6"
              onClick={handleViewData}
              disabled={loading}
            >
              {loading ? (
                "Loading..."
              ) : (
                <>
                  <Table2 className="h-4 w-4 mr-2" />
                  View Data
                </>
              )}
            </Button>
            <Button
              // className="w-full bg-rose-600 text-white hover:bg-rose-700 py-6"
              variant={"outline"}
              onClick={handleReset}
            >
              <>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Filters
              </>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
