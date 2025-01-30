"use server";

import { Attendance } from "@/app/(dashboard)/dashboard/attendance/today/columns";
import { get } from "@/lib/fetch-wrapper";

export async function getAttendancesReports(
  startDate: string,
  endDate: string
): Promise<Attendance[]> {
  const response = await get(
    `reports/attendances?startDate=${startDate}&endDate=${endDate}`,
    ["attendances"]
  );
  return response as Attendance[];
}
