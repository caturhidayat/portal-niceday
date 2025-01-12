"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { updateAttendance } from "./actions";
import { revalidateTag } from "next/cache";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";

const initialState = {
  success: false,
  message: "",
  inputs: {
    checkInTime: "",
    checkOutTime: "",
  },
};

export default function FormEditAttendance({
  attendance,
}: {
  attendance: {
    id: string;
    attendanceDate: string;
    checkInTime: string;
    checkOutTime: string;
  };
}) {
  // const [state, action, isPending] = useActionState(
  //   updateAttendance,
  //   initialState
  // );

  console.log("attendance : ", attendance);
  const checkInTimeFormatted = format(
    new Date(Number(attendance.checkInTime)),
    "HH:mm"
  );
  const checkOutTimeFormatted = format(
    new Date(Number(attendance.checkOutTime)),
    "HH:mm"
  );

  console.log("check in time formatted: ", checkInTimeFormatted);
  console.log("check out time formatted: ", checkOutTimeFormatted);

  const updateAttendanceWithId = updateAttendance.bind(null, attendance.id);

  return (
    <form className="space-y-8">
      <Label>Check-in Time</Label>
      <Input
        type="time"
        name="checkInTime"
        defaultValue={checkInTimeFormatted}
      />
      <Label>Check-out Time</Label>
      <Input
        type="time"
        name="checkOutTime"
        defaultValue={checkOutTimeFormatted}
      />
      <Button type="submit">Update Attendance</Button>
    </form>
  );
}
