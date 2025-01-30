"use client";

import { format, setHours, setMinutes } from "date-fns";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { updateAttendance } from "./actions";
import { Label } from "@/components/ui/label";
import { Attendance } from "../today/columns";
import React from "react";

export default function FormEditAttendance({
  attendance,
}: {
  attendance: Attendance;
}) {
  const [isPending, setIsPending] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string[]>>({});

  // Format the check-in and check-out times
  const checkInTimeFormatted = attendance.checkInTime
    ? format(new Date(Number(attendance.checkInTime)), "HH:mm")
    : "";
  const checkOutTimeFormatted = attendance.checkOutTime
    ? format(new Date(Number(attendance.checkOutTime)), "HH:mm")
    : "";

  // Handle submit update attendance
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setErrors({});

    try {
      const formData = new FormData(e.currentTarget);
      const checkIn = formData.get("checkInTime") as string;
      const checkOut = formData.get("checkOutTime") as string;

      // Parse the check-in and check-out times
      const [startHour, startMinute] = checkIn.split(":").map(Number);
      const [endHour, endMinute] = checkOut.split(":").map(Number);

      // Create new Date objects from the parsed times
      const checkInTime = new Date(
        setMinutes(setHours(+attendance.attendanceDate, startHour), startMinute)
      )
        .getTime()
        .toString();

      const checkOutTime = new Date(
        setMinutes(setHours(+attendance.attendanceDate, endHour), endMinute)
      )
        .getTime()
        .toString();

      // Send request update attendance
      const response = await updateAttendance(attendance.id, {
        userId: attendance.userId,
        attendanceDate: attendance.attendanceDate,
        checkInTime,
        checkOutTime,
      });

      // Handle response
      if (response.success) {
        toast.success("Success", {
          description: response.message,
          duration: 5000,
        });
      } else {
        if (response.errors) {
          setErrors(response.errors);
          toast.error("Validation Error", {
            description: "Please check the form for errors",
            duration: 5000,
          });
        } else {
          toast.error("Failed", {
            description: response.message,
            duration: 5000,
          });
        }
      }
    } catch (error) {
      toast.error("Failed to update attendance", {
        description: error instanceof Error ? error.message : "Unknown error",
        duration: 5000,
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <p>
          Edit Attendance{" "}
          {format(new Date(Number(attendance.attendanceDate)), "yyyy-MM-dd")}{" "}
          for <strong>{attendance.fullName}</strong>
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="checkInTime">Check In Time</Label>
        <Input
          id="checkInTime"
          type="time"
          name="checkInTime"
          defaultValue={checkInTimeFormatted}
        />
        {errors.checkInTime && (
          <p className="text-sm text-red-500">
            {errors.checkInTime.join(", ")}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="checkOutTime">Check Out Time</Label>
        <Input
          id="checkOutTime"
          type="time"
          name="checkOutTime"
          defaultValue={checkOutTimeFormatted}
        />
        {errors.checkOutTime && (
          <p className="text-sm text-red-500">
            {errors.checkOutTime.join(", ")}
          </p>
        )}
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Updating..." : "Update Attendance"}
      </Button>
    </form>
  );
}
