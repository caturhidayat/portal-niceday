"use server";

import { put, get } from "@/lib/fetch-wrapper";
import { revalidateTag } from "next/cache";

export interface OvertimeFormData {
  id: string;
  userId: string;
  username: string;
  name: string;
  overtimeDate: string;
  startTime: string;
  endTime: string;
  totalHours: number;
  overtimeRateId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

enum OvertimeStatus {
  SCHEDULED = "SCHEDULED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface ActionResponseOvertime {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof OvertimeFormData]?: string[];
  };
  inputs?: OvertimeFormData;
}

export interface AttendanceData {
  id: string;
  userId: string;
  attendanceDate: number;
  clockIn: string;
  clockOut: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export async function approveOvertime(id: string) {
  const status = OvertimeStatus.COMPLETED;
  const formData = new FormData();
  formData.append("status", status);

  console.log("dataToSend : ", formData);
  console.log("id : ", id);

  try {
    const res = await put("overtimes", id, formData);

    console.log("res from server action : ", res);

    revalidateTag("overtimes");
    return {
      success: true,
      message: "Overtime has been approved successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to approve overtime",
    };
  }
}

export async function getAttendanceData(employeeIds: string[], date: Date) {
  try {
    const timestamp = date.getTime();
    const ids = employeeIds.join(',');
    
    const data = await get<AttendanceData[]>(`attendances?ids=${ids}&date=${timestamp}`);
    
    return {
      success: true,
      data,
      message: 'Attendance data fetched successfully'
    };
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return {
      success: false,
      data: [],
      message: error instanceof Error ? error.message : 'Failed to fetch attendance data'
    };
  }
}

// export async function updateOvertime(
//   _prevState: ActionResponseOvertime,
//   formData: FormData
// ) {
//   const userId = formData.get("id") as string;

//   try {
//     // Remove id from formData since it's in the URL
//     const dataToSend = new FormData();
//     for (const [key, value] of formData.entries()) {
//       if (key !== "id") {
//         dataToSend.append(key, value);
//       }
//     }

//     console.log("dataToSend : ", dataToSend);

//     const res = await put(`users`, userId, dataToSend);
//     console.log("res from server action : ", res);

//     revalidateTag("employees");
//     return {
//       success: true,
//       message: "Employee has been updated successfully",
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message: "Failed to update employee",
//     };
//   }
// }
