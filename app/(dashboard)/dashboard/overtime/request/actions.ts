"use server";

import { get, post } from "@/lib/fetch-wrapper";
import { z } from "zod";
import { Attendance } from "../../attendance/today/columns";
import { OvertimeReasonsType } from "../../setting/overtime-reason/table/columns";
import { setHours, setMinutes } from "date-fns";
import { revalidateTag } from "next/cache";

export interface Overtime {
  id: string;
  userId: string;
  attendanceId: string;
  startTime: string;
  endTime: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}

const createOvertimeSchema = z.object({
  userId: z.string().min(1, { message: "User is required" }),
  attendanceId: z.string().min(1, { message: "Attendance ID is required" }),
  overtimeDate: z.string().min(1, { message: "Overtime date is required" }),
  startTime: z.string().min(1, { message: "Start time is required" }),
  endTime: z.string().min(1, { message: "End time is required" }),
  remarks: z.string().min(1, { message: "Remarks is required" }),
  reasonId: z.string().min(1, { message: "Reason is required" }),
});

export interface CreateOvertimeFormData {
  userId: string;
  attendanceId: string;
  overtimeDate: string;
  startTime: string;
  endTime: string;
  remarks: string;
  reasonId: string;
}

export interface ActionResponseOvertime {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof CreateOvertimeFormData]?: string[];
  };
  inputs?: CreateOvertimeFormData;
}

// ! Create overtime
export async function createOvertime(
  _prevState: ActionResponseOvertime,
  formData: FormData
): Promise<ActionResponseOvertime> {
  try {
    const attendanceDate = formData.get("attendanceDate") as string;
    const start = formData.get("startTime") as string;
    const end = formData.get("endTime") as string;

    // Parse the check-in and check-out times
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    // Create new Date objects from the parsed times
    const checkInTime = new Date(
      setMinutes(setHours(+attendanceDate, startHour), startMinute)
    )
      .getTime()
      .toString();

    const checkOutTime = new Date(
      setMinutes(setHours(+attendanceDate, endHour), endMinute)
    )
      .getTime()
      .toString();

    // raw data
    const rawData: any = {
      userId: formData.get("userId") as string,
      attendanceId: formData.get("attendanceId") as string,
      overtimeDate: attendanceDate,
      startTime: checkInTime,
      endTime: checkOutTime,
      remarks: formData.get("remarks") as string,
      reasonId: formData.get("reasonId") as string,
    };

    console.log("rawData : ", rawData);

    // Validate data
    const validatedData = createOvertimeSchema.safeParse(rawData);
    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the following errors",
        errors: validatedData.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }

    const submitData = new FormData();
    submitData.append("userId", validatedData.data.userId);
    submitData.append("attendanceId", validatedData.data.attendanceId);
    submitData.append("overtimeDate", validatedData.data.overtimeDate);
    submitData.append("startTime", validatedData.data.startTime);
    submitData.append("endTime", validatedData.data.endTime);
    submitData.append("remarks", validatedData.data.remarks);
    submitData.append("reasonId", validatedData.data.reasonId);

    console.log("submitData : ", submitData);
    const res = await post("overtimes", submitData);

    console.log("res : ", res);

    revalidateTag("overtimes");
    revalidateTag("attendances");

    return {
      success: true,
      message: "Overtime request has been created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create overtime request",
    };
  }
}

// export async function getAttendances() {
//   const response = await get("attendances");
//   return response;
// }

export async function getAttendances(): Promise<Attendance[]> {
  const response = await get("attendances", ["attendances"]);
  return response as Attendance[];
}

export async function getOvertimes(): Promise<Overtime[]> {
  const response = await get("overtimes", ["overtimes"]);
  return response as Overtime[];
}

// Overtime reason
export async function getOvertimeReasons(): Promise<OvertimeReasonsType[]> {
  const overtimeReasons = await get("overtimes/reason", ["overtime-reasons"]);
  return overtimeReasons as OvertimeReasonsType[];
}
