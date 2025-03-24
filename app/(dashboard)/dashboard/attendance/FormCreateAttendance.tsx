"use client";

import { format, setHours, setMinutes } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { AttendanceData } from "./toolbar/columns";
import React from "react";
import { createAttendance } from "./actions";
import { Textarea } from "@/components/ui/textarea";

export default function FormCreateAttendance({
  attendance,
}: {
  attendance: AttendanceData;
}) {
  const [isPending, setIsPending] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string[]>>({});

  // Format check-in and check-out time
  const checkInTimeFormatted = attendance.checkInTime
    ? format(new Date(Number(attendance.checkInTime)), "HH:mm")
    : "";
  const checkOutTimeFormatted = attendance.checkOutTime
    ? format(new Date(Number(attendance.checkOutTime)), "HH:mm")
    : "";

  // Handle submit create attendance with server action
  const handleSubmit = async (formData: FormData) => {
    setIsPending(true);
    setErrors({});

    try {
      // Add attendance data to formData
      formData.append("userId", attendance.userId);
      formData.append("attendanceDate", attendance.attendanceDate);

      // Send create attendance request using server action
      const response = await createAttendance(formData);

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
      toast.error("Failed to add attendance data", {
        description:
          error instanceof Error ? error.message : "Unknown error",
        duration: 5000,
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <p>
          Add Attendance{" "}
          {format(new Date(Number(attendance.attendanceDate)), "dd-MMM-yyyy")}{" "}
          for <strong>{attendance.fullName}</strong>
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="startTime">Check In Time (Optional)</Label>
        <Input
          id="startTime"
          type="time"
          name="checkInTime"
          defaultValue={checkInTimeFormatted}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">Leave empty if you don't want to fill</p>
        {errors.checkInTime && (
          <p className="text-sm text-red-500">
            {errors.checkInTime.join(", ")}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="endTime">Check Out Time (Optional)</Label>
        <Input
          id="checkOutTime"
          type="time"
          name="checkOutTime"
          defaultValue={checkOutTimeFormatted}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">Leave empty if you don't want to fill</p>
        {errors.checkOutTime && (
          <p className="text-sm text-red-500">
            {errors.checkOutTime.join(", ")}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="remarks">Notes</Label>
        <Textarea
          id="remarks"
          name="remarks"
          defaultValue={attendance.remarks || ""}
          placeholder="Add notes (optional)"
          className="w-full"
        />
        {errors.remarks && (
          <p className="text-sm text-red-500">
            {errors.remarks.join(", ")}
          </p>
        )}
      </div>
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Adding..." : "Add Attendance Data"}
      </Button>
    </form>
  );
}
