"use server";

import { revalidateTag } from "next/cache";
import { get, put } from "@/lib/fetch-wrapper";
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

export async function getAttendance(): Promise<Attendance[]> {
  const response = await get("attendances", ["attendances"]);
  return response as Attendance[];
}

export async function updateAttendance(
  attendanceId: string,
  data: AttendanceFormData
): Promise<ActionResponseAttendance> {
  try {
    const formData = new FormData();
    formData.append("attendanceDate", data.attendanceDate.toISOString());
    formData.append("checkInTime", data.checkInTime);
    formData.append("checkOutTime", data.checkOutTime);

    await put(`attendances/${attendanceId}`, formData);

    // Revalidate the attendance list to show updated data
    revalidateTag("attendances");

    return { success: true, message: "Attendance updated successfully" };
  } catch (error) {
    console.error("Error updating attendance:", error);
    throw error;
  }
}
