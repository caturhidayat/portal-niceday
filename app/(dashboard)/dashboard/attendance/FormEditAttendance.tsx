"use client";

import { format, setHours, setMinutes } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { AttendanceData } from "./toolbar/columns";
import React from "react";
import { updateAttendance } from "./actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function FormEditAttendance({
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

  // Handle submit update attendance dengan server action
  // const handleSubmit = async (formData: FormData) => {
  //   setIsPending(true);
  //   setErrors({});

  //   try {
  //     // Add attendance data to formData
  //     // Since there is no id property, we use userId and attendanceDate as identifier
  //     // formData.append(
  //     //   "attendanceId",
  //     //   attendance.userId + "-" + attendance.attendanceDate
  //     // );
  //     formData.append("userId", attendance.userId);
  //     formData.append("attendanceDate", attendance.attendanceDate);

  //     // Send update attendance request using server action
  //     const response = await updateAttendance(attendance.id, formData);

  //     // Handle response
  //     if (response.success) {
  //       toast.success("Success", {
  //         description: response.message,
  //         duration: 5000,
  //       });
  //     } else {
  //       if (response.errors) {
  //         setErrors(response.errors);
  //         toast.error("Validation Error", {
  //           description: "Please check the form for errors",
  //           duration: 5000,
  //         });
  //       } else {
  //         toast.error("Failed", {
  //           description: response.message,
  //           duration: 5000,
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     toast.error("Failed to update attendance data", {
  //       description:
  //         error instanceof Error ? error.message : "Unknown error",
  //       duration: 5000,
  //     });
  //   } finally {
  //     setIsPending(false);
  //   }
  // };

  // Handle submit update attendance
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setErrors({});

    try {
      const formData = new FormData(e.currentTarget);
      const checkIn = formData.get("checkInTime") as string;
      const checkOut = formData.get("checkOutTime") as string;
      const remarks = formData?.get("remarks") ? formData.get("remarks") as string : null;

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
        remarks,
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <p>
          Edit Attendance{" "}
          {format(new Date(Number(attendance.attendanceDate)), "dd-MMM-yyyy")}{" "}
          for <strong>{attendance.fullName}</strong>
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="checkInTime">Check In Time (Optional)</Label>
        <Input
          id="checkInTime"
          type="time"
          name="checkInTime"
          defaultValue={checkInTimeFormatted}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">Leave empty if you don't want to change</p>
        {errors.checkInTime && (
          <p className="text-sm text-red-500">
            {errors.checkInTime.join(", ")}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="checkOutTime">Check Out Time (Optional)</Label>
        <Input
          id="checkOutTime"
          type="time"
          name="checkOutTime"
          defaultValue={checkOutTimeFormatted}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">Leave empty if you don't want to change</p>
        {errors.checkOutTime && (
          <p className="text-sm text-red-500">
            {errors.checkOutTime.join(", ")}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="remarks">Remarks (Optional)</Label>
        <Textarea
          id="remarks"
          name="remarks"
          defaultValue={attendance.remarks || ""}
          placeholder="Add remarks (optional)"
          className="w-full"
        />
        {errors.remarks && (
          <p className="text-sm text-red-500">
            {errors.remarks.join(", ")}
          </p>
        )}
      </div>
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Updating..." : "Update Attendance"}
      </Button>
    </form>
  );
}
