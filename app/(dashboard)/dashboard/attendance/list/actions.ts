"use server";

import { revalidateTag } from "next/cache";
import { del, get, put } from "@/lib/fetch-wrapper";
import { Attendance } from "../today/columns";

type AttendanceData = {
  id: string;
  attendanceDate: Date;
  checkInTime: string;
  checkOutTime: string;
};

export interface AttendanceFormData {
  id: string;
  attendanceDate: Date;
  checkInTime: string;
  checkOutTime: string;
}

export interface ActionResponseAttendance {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof AttendanceFormData]?: string[];
  };
  inputs?: AttendanceFormData;
}

// Get all attendance
export async function getAttendance(): Promise<Attendance[]> {
  const response = await get("attendances", ["attendances"]);
  return response as Attendance[];
}

// Update attendance
export async function updateAttendance(
  attendanceId: string,
  data: AttendanceFormData
): Promise<ActionResponseAttendance> {
  try {
    const formData = new FormData();
    formData.append("attendanceDate", data.attendanceDate.toISOString());
    formData.append("checkInTime", data.checkInTime);
    formData.append("checkOutTime", data.checkOutTime);

    await put(`attendances`, attendanceId, formData);

    // Revalidate the attendance list to show updated data
    revalidateTag("attendances");

    return { success: true, message: "Attendance updated successfully" };
  } catch (error) {
    console.error("Error updating attendance:", error);
    throw error;
  }
}

// Delete attendance
export async function deleteAttendance(attendanceId: string) {
  console.log("delete attendance id : ", attendanceId);
  await del("attendances", attendanceId);
  revalidateTag("attendances");
}
