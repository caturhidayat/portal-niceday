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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, RotateCcw, Table2 } from "lucide-react";
import { useState } from "react";
import { ShiftGroup } from "../actions";
import { Departments } from "../../employees/table/columns";
import { toast } from "sonner";
import { Attendance } from "./columns";
import { Separator } from "@/components/ui/separator";

export default function HorizontalToolbar({
  shiftGroups,
  departments,
  onFilterAttendance,
  startDate,
  endDate,
  shiftGroupId,
  departmentId,
  selectedUsers,
  setStartDate,
  setEndDate,
  setShiftGroupId,
  setDepartmentId,
  handleReset,
}: {
  shiftGroups: ShiftGroup[];
  departments: Departments[];
  onFilterAttendance: (
    startDate?: number,
    endDate?: number,
    departmentId?: string,
    shiftGroupId?: string,
    userIds?: string[]
  ) => Promise<Attendance[]>;
  startDate?: number;
  endDate?: number;
  shiftGroupId: string;
  departmentId: string;
  selectedUsers: string[];
  setStartDate: (date?: number) => void;
  setEndDate: (date?: number) => void;
  setShiftGroupId: (id: string) => void;
  setDepartmentId: (id: string) => void;
  handleReset: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);

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

  return (
    // <Card className="w-full">
    //   <CardContent className="p-4">
    //     <div className="flex flex-wrap items-center gap-4">
    //       {/* Date Selection */}
    //       <div className="flex items-center gap-2">
    //         <div>
    //           <Label className="mr-2">From</Label>
    //           <Popover>
    //             <PopoverTrigger asChild>
    //               <Button
    //                 variant={"outline"}
    //                 className={cn(
    //                   "w-[140px] justify-start text-left font-normal",
    //                   !startDate && "text-muted-foreground"
    //                 )}
    //               >
    //                 <CalendarIcon className="mr-2 h-4 w-4" />
    //                 {startDate ? (
    //                   format(new Date(startDate), "dd/MM/yyyy")
    //                 ) : (
    //                   <span>Start date</span>
    //                 )}
    //               </Button>
    //             </PopoverTrigger>
    //             <PopoverContent className="w-auto p-0" align="start">
    //               <Calendar
    //                 mode="single"
    //                 selected={startDate ? new Date(startDate) : undefined}
    //                 onSelect={(val) => val && setStartDate(val.getTime())}
    //                 initialFocus
    //               />
    //             </PopoverContent>
    //           </Popover>
    //         </div>

    //         <div>
    //           <Label className="mr-2">To</Label>
    //           <Popover>
    //             <PopoverTrigger asChild>
    //               <Button
    //                 variant={"outline"}
    //                 className={cn(
    //                   "w-[140px] justify-start text-left font-normal",
    //                   !endDate && "text-muted-foreground"
    //                 )}
    //               >
    //                 <CalendarIcon className="mr-2 h-4 w-4" />
    //                 {endDate ? (
    //                   format(new Date(endDate), "dd/MM/yyyy")
    //                 ) : (
    //                   <span>End date</span>
    //                 )}
    //               </Button>
    //             </PopoverTrigger>
    //             <PopoverContent className="w-auto p-0" align="start">
    //               <Calendar
    //                 mode="single"
    //                 selected={endDate ? new Date(endDate) : undefined}
    //                 onSelect={(val) => val && setEndDate(val.getTime())}
    //                 initialFocus
    //                 disabled={(date) => {
    //                   return (
    //                     date < new Date(Number(startDate)) ||
    //                     startDate === undefined
    //                   );
    //                 }}
    //               />
    //             </PopoverContent>
    //           </Popover>
    //         </div>
    //       </div>

    //       {/* Department */}
    //       <div>
    //         <Label className="mr-2">Department</Label>
    //         <Select
    //           value={departmentId}
    //           onValueChange={setDepartmentId}
    //         >
    //           <SelectTrigger className="w-[180px]">
    //             <SelectValue placeholder="Select department" />
    //           </SelectTrigger>
    //           <SelectContent>
    //             <SelectGroup>
    //               {departments.map((item) => (
    //                 <SelectItem
    //                   key={item.id}
    //                   value={item.id.toString()}
    //                 >
    //                   {item.name}
    //                 </SelectItem>
    //               ))}
    //             </SelectGroup>
    //           </SelectContent>
    //         </Select>
    //       </div>

    //       {/* Shift Group */}
    //       <div>
    //         <Label className="mr-2">Shift Group</Label>
    //         <Select
    //           value={shiftGroupId}
    //           onValueChange={setShiftGroupId}
    //         >
    //           <SelectTrigger className="w-[180px]">
    //             <SelectValue placeholder="Select shift group" />
    //           </SelectTrigger>
    //           <SelectContent>
    //             <SelectGroup>
    //               {shiftGroups.map((item) => (
    //                 <SelectItem
    //                   key={item.id}
    //                   value={item.id.toString()}
    //                 >
    //                   {item.name}
    //                 </SelectItem>
    //               ))}
    //             </SelectGroup>
    //           </SelectContent>
    //         </Select>
    //       </div>

    //       {/* Action Buttons */}
    //       <div className="flex items-center gap-2 ml-auto">
    //         <Button
    //           onClick={handleViewData}
    //           disabled={loading}
    //         >
    //           {loading ? (
    //             "Loading..."
    //           ) : (
    //             <>
    //               <Table2 className="h-4 w-4 mr-2" />
    //               View Data
    //             </>
    //           )}
    //         </Button>
    //         <Button
    //           variant={"outline"}
    //           onClick={handleReset}
    //         >
    //           <>
    //             <RotateCcw className="h-4 w-4 mr-2" />
    //             Reset
    //           </>
    //         </Button>
    //       </div>
    //     </div>
    //   </CardContent>
    // </Card>
    <div className="bg-slate-300 p-2">
      <div className="flex flex-wrap items-center gap-4">
        {/* Date Selection */}
        <div className="flex items-center gap-2">
          <div>
            <Label className="mr-2">From</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[140px] justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(new Date(startDate), "dd/MM/yyyy")
                  ) : (
                    <span>Start date</span>
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

          <div>
            <Label className="mr-2">To</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[140px] justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? (
                    format(new Date(endDate), "dd/MM/yyyy")
                  ) : (
                    <span>End date</span>
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

        <div className="grid items-center gap-2 sm:grid-cols-2">
          {/* Department */}
          <div>
            <Label className="mr-2">Department</Label>
            <Select value={departmentId} onValueChange={setDepartmentId}>
              <SelectTrigger className="w-[180px] bg-background">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {departments.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Shift Group */}
          <div>
            <Label className="mr-2">Shift Group</Label>
            <Select value={shiftGroupId} onValueChange={setShiftGroupId}>
              <SelectTrigger className="w-[180px] bg-background">
                <SelectValue placeholder="Select shift group" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {shiftGroups.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid items-center gap-2 sm:grid-cols-2">
          <Button
            onClick={handleViewData}
            disabled={loading}
            className="bg-teal-600 hover:bg-teal-700"
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
            variant={"outline"}
            onClick={handleReset}
            className="bg-orange-400 hover:bg-orange-600"
          >
            <>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </>
          </Button>
        </div>
      </div>
    </div>
  );
}
