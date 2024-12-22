"use server";

import { get } from "@/lib/fetch-wrapper";
import { Attendance } from "../today/columns";

export async function getAttendance(): Promise<Attendance[]> {
  const response = await get("attendances", ["attendances"]);
  return response as Attendance[];
}
