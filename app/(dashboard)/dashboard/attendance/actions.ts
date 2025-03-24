"use server";

import { get, post, put } from "@/lib/fetch-wrapper";
import { Departments, User } from "../employees/table/columns";
import { AttendanceData } from "./toolbar/columns";
import { z } from "zod";
import { revalidateTag } from "next/cache";
import { setHours, setMinutes } from "date-fns";

// Function to filter attendance data based on parameters
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

  // Build query parameters
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

  // Call API to get attendance data based on filter
  const response = await get(`attendances/filter?${queryParams}`, ["attendances"]);
  return response as AttendanceData[];
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

// Schema for validating update attendance data
// const updateAttendanceSchema = z.object({
//   userId: z.string().min(1, { message: "User ID is required" }),
//   attendanceDate: z.string().min(1, { message: "Attendance date is required" }),
//   startTime: z.string().optional(),
//   endTime: z.string().optional(),
//   remarks: z.string().optional(),
// });

// // Interface for update attendance form data
// export interface UpdateAttendanceFormData {
//   userId: string;
//   attendanceDate: string;
//   startTime?: string;
//   endTime?: string;
//   remarks?: string;
// }

// // Interface for server action response
// export interface ActionResponseUpdateAttendance {
//   success: boolean;
//   message: string;
//   errors?: {
//     [K in keyof UpdateAttendanceFormData]?: string[];
//   };
// }

// Server action for updating attendance
// export async function updateAttendance(
//   formData: FormData
// ): Promise<ActionResponseUpdateAttendance> {
//   try {
//     // attendanceId can be a combination of userId-attendanceDate
//     const attendanceId = formData.get("attendanceId") as string;
//     const userId = formData.get("userId") as string;
//     const attendanceDate = formData.get("attendanceDate") as string;
//     const checkInTimeStr = formData.get("checkInTime") as string || "";
//     const checkOutTimeStr = formData.get("checkOutTime") as string || "";
//     const remarks = formData.get("remarks") as string || null;

//     // Parse check-in and check-out times if available
//     let checkInTime = null;
//     let checkOutTime = null;
    
//     if (checkInTimeStr) {
//       const [checkInHour, checkInMinute] = checkInTimeStr.split(":").map(Number);
//       checkInTime = new Date(
//         setMinutes(setHours(+attendanceDate, checkInHour), checkInMinute)
//       )
//         .getTime()
//         .toString();
//     }
    
//     if (checkOutTimeStr) {
//       const [checkOutHour, checkOutMinute] = checkOutTimeStr.split(":").map(Number);
//       checkOutTime = new Date(
//         setMinutes(setHours(+attendanceDate, checkOutHour), checkOutMinute)
//       )
//         .getTime()
//         .toString();
//     }

//     const data = {
//       userId,
//       attendanceDate,
//       checkInTime,
//       checkOutTime,
//       remarks,
//     };

//     // Validate data
//     const validatedData = updateAttendanceSchema.safeParse(data);
//     if (!validatedData.success) {
//       return {
//         success: false,
//         message: "Please fix the following errors",
//         errors: validatedData.error.flatten().fieldErrors,
//       };
//     }

//     // Create FormData to send to API
//     const submitData = new FormData();
//     submitData.append("userId", userId);
//     submitData.append("attendanceDate", attendanceDate);
    
//     if (checkInTime) {
//       submitData.append("checkInTime", checkInTime);
//     }
    
//     if (checkOutTime) {
//       submitData.append("checkOutTime", checkOutTime);
//     }
    
//     if (remarks) {
//       submitData.append("remarks", remarks);
//     }

//     console.log("Submit data:", submitData);

//     // Send update attendance request
//     await put(`attendances`, attendanceId, submitData);

//     // Revalidate attendance data
//     revalidateTag("attendances");

//     return {
//       success: true,
//       message: "Data kehadiran berhasil diperbarui",
//     };
//   } catch (error) {
//     console.error("Error updating attendance:", error);
//     return {
//       success: false,
//       message: "Gagal memperbarui data kehadiran",
//     };
//   }
// }


const updateAttendanceSchema = z.object({
  userId: z.string().min(1, { message: "User is required" }),
  attendanceDate: z.string(),
  checkInTime: z.string().min(4, { message: "Check in time is required" }),
  checkOutTime: z.string().min(4, { message: "Check out time is required" }),
  remarks: z.string().optional(),
});

export interface updateAttendanceFormData {
  userId: string;
  attendanceDate: string;
  checkInTime: string;
  checkOutTime: string;
  remarks: string | null;
}

export interface ActionResponseUpdateAttendance {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof updateAttendanceFormData]?: string[];
  };
  inputs?: updateAttendanceFormData;
}
// Update attendance
export async function updateAttendance(
  attendanceId: string,
  data: updateAttendanceFormData
): Promise<ActionResponseUpdateAttendance> {
  try {
    const formData = new FormData();
    formData.append("userId", data.userId);
    formData.append("attendanceDate", data.attendanceDate);
    formData.append("checkInTime", data.checkInTime);
    formData.append("checkOutTime", data.checkOutTime);
    if (data.remarks) {
      formData.append("remarks", data.remarks);
    }

    console.log("formData : ", formData);

    // Validate data
    const validatedData = updateAttendanceSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the following errors",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    console.log("validatedData : ", validatedData);
    await put(`attendances`, attendanceId, formData);

    // Revalidate the attendance list to show updated data
    revalidateTag("attendances");

    return {
      success: true,
      message: "Attendance has been updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update attendance",
    };
  }
}

// Schema untuk validasi data create attendance
const createAttendanceSchema = z.object({
  userId: z.string().min(1, { message: "User ID diperlukan" }),
  attendanceDate: z.string().min(1, { message: "Tanggal kehadiran diperlukan" }),
  checkInTime: z.string().optional().nullable(),
  checkOutTime: z.string().optional().nullable(),
  remarks: z.string().optional().nullable(),
});

// Interface untuk data form create attendance
export interface CreateAttendanceFormData {
  userId: string;
  attendanceDate: string;
  checkInTime?: string;
  checkOutTime?: string;
  remarks?: string;
}

// Interface untuk response dari server action
export interface ActionResponseCreateAttendance {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof CreateAttendanceFormData]?: string[];
  };
}

// Server action untuk create attendance
export async function createAttendance(
  formData: FormData
): Promise<ActionResponseCreateAttendance> {
  try {
    const userId = formData.get("userId") as string;
    const attendanceDate = formData.get("attendanceDate") as string;
    const checkInTimeStr = formData.get("checkInTime") as string || "";
    const checkOutTimeStr = formData.get("checkOutTime") as string || "";
    const remarks = formData.get("remarks") as string || null;

    // Parse check-in and check-out times if available
    let checkInTime = null;
    let checkOutTime = null;
    
    if (checkInTimeStr) {
      const [checkInHour, checkInMinute] = checkInTimeStr.split(":").map(Number);
      checkInTime = new Date(
        setMinutes(setHours(+attendanceDate, checkInHour), checkInMinute)
      )
        .getTime()
        .toString();
    }
    
    if (checkOutTimeStr) {
      const [checkOutHour, checkOutMinute] = checkOutTimeStr.split(":").map(Number);
      checkOutTime = new Date(
        setMinutes(setHours(+attendanceDate, checkOutHour), checkOutMinute)
      )
        .getTime()
        .toString();
    }

    const data = {
      userId,
      attendanceDate,
      checkInTime,
      checkOutTime,
      remarks,
    };

    // Validate data
    const validatedData = createAttendanceSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the following errors",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    // Buat FormData untuk dikirim ke API
    const submitData = new FormData();
    submitData.append("userId", userId);
    submitData.append("attendanceDate", attendanceDate);
    
    if (checkInTime) {
      submitData.append("checkInTime", checkInTime);
    }
    
    if (checkOutTime) {
      submitData.append("checkOutTime", checkOutTime);
    }
    
    if (remarks) {
      submitData.append("remarks", remarks);
    }

    console.log('submit data :', submitData);

    // Kirim request create attendance
    await post(`attendances/entry`, submitData);

    // Revalidate attendance data
    revalidateTag("attendances");

    return {
      success: true,
      message: "Data attendance successfully added",
    };
  } catch (error) {
    console.error("Error creating attendance:", error);
    return {
      success: false,
      message: "Failed to add attendance data",
    };
  }
}
