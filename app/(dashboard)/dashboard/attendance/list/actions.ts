"use server";

import { revalidateTag } from "next/cache";

type AttendanceData = {
  attendanceDate: Date;
  checkInTime: string;
  checkOutTime: string;
};

import { get } from "@/lib/fetch-wrapper";
import { Attendance } from "../today/columns";

export async function getAttendance(): Promise<Attendance[]> {
  const response = await get("attendances", ["attendances"]);
  return response as Attendance[];
}


export async function updateAttendance(id: string, data: AttendanceData) {
  try {
    // TODO: Add your API call or database update logic here
    // Example:
    // const response = await fetch(`/api/attendance/${id}`, {
    //   method: 'PUT',
    //   body: JSON.stringify(data),
    // });
    
    // if (!response.ok) {
    //   throw new Error('Failed to update attendance');
    // }

    // Revalidate the attendance list page to show updated data
    // revalidatePath("/dashboard/attendance/list");
    revalidateTag("attendances");
    return { success: true };
  } catch (error) {
    console.error("Error updating attendance:", error);
    throw error;
  }
}
