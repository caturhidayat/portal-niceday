"use server";

import { get } from "@/lib/fetch-wrapper";
import { Departments, User } from "../employees/table/columns";
import { Attendance } from "./toolbar/columns";

// Definisikan tipe data untuk hasil filter attendance
export type AttendanceData = {
  id: string;
  userId: string;
  attendanceDate: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  isLate: boolean;
  lateMinutes: number | null;
  workHours: number | null;
  fullName: string | null;
  username: string | null;
  department: string | null;
  shiftName: string | null;
  shiftGroup: string | null;
  branch: string | null;
  officeLocationName: string | null;
};

// Fungsi untuk memfilter data attendance berdasarkan parameter
export async function filterAttendance(
  startDate?: number,
  endDate?: number,
  departmentId?: string,
  shiftGroupId?: string,
  userIds?: string[]
) {
  if (!startDate || !endDate) {
    return [];
  }

  // Membangun query parameters
  let queryParams = `startDate=${startDate}&endDate=${endDate}`;

  if (departmentId) {
    queryParams += `&departmentId=${departmentId}`;
  }

  if (shiftGroupId) {
    queryParams += `&shiftGroupId=${shiftGroupId}`;
  }

  if (userIds && userIds.length > 0) {
    queryParams += `&userIds=${userIds.join(",")}`;
  }

  // Memanggil API untuk mendapatkan data attendance berdasarkan filter
  const response = await get(`attendances/filter?${queryParams}`);
  return response as Attendance[];
}

type Shift = {
  id: string;
  day: number;
  shiftId: string;
  groupId: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}

export type ShiftGroup = {
  id: string;
  name: string;
  startDate: string;
  description: string;
  cycleLength: number;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  shifts: Shift[];
}

export async function getDepartments() {
  const response = await get("departments");
  return response as Departments[];
}

export async function getShiftGroups() {
  const response = await get("shift-group");
  return response as ShiftGroup[];
}

export async function getUsers() {
  const response = await get("users");
  return response as User[];
}
