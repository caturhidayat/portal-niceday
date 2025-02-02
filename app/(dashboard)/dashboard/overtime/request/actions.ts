"use server";

import { get, post, postRaw } from "@/lib/fetch-wrapper";
import { z } from "zod";
import { Attendance } from "../../attendance/today/columns";
import { setHours, setMinutes } from "date-fns";
import { revalidateTag } from "next/cache";
import { OvertimeBilledType } from "../../setting/overtime-billed/table/columns";
import { OvertimeRulesType } from "../../setting/overtime-rule/table/columns";

// userId: "",
// attendanceId: "",
// overtimeDate: "",
// startTime: "",
// endTime: "",
// notes: "",
// billedId: "",
// ruleId: "",
// },
export interface Overtime {
  id: string;
  userId: string;
  attendanceId: string;
  startTime: string;
  endTime: string;
  description: string;
  status: string;
  notes: string;
  billedId: number;
  ruleId: number;
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
  notes: z.string().min(1, { message: "Notes is required" }),
  billedId: z.number(),
  ruleId: z.number(),
});

export interface CreateOvertimeFormData {
  userId: string;
  attendanceId: string;
  overtimeDate: string;
  startTime: string;
  endTime: string;
  notes: string;
  billedId: number;
  ruleId: number;
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
      notes: formData.get("notes") as string,
      billedId: formData.get("billedId") as unknown as number,
      ruleId: formData.get("ruleId") as unknown as number,
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

    console.log("validatedData ==> : ", validatedData);

    const submitData = new FormData();
    submitData.append("userId", validatedData.data.userId);
    submitData.append("attendanceId", validatedData.data.attendanceId);
    submitData.append("overtimeDate", validatedData.data.overtimeDate);
    submitData.append("startTime", validatedData.data.startTime);
    submitData.append("endTime", validatedData.data.endTime);
    submitData.append("notes", validatedData.data.notes);
    submitData.append("billedId", validatedData.data.billedId.toFixed());
    submitData.append("ruleId", validatedData.data.ruleId.toFixed());

    console.log("submitData : ", submitData);
    const res = await postRaw("overtimes", submitData);

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
export async function getOvertimeBilled(): Promise<OvertimeBilledType[]> {
  const overtimeBilled = await get("overtimes-billed", ["overtime-billed"]);
  return overtimeBilled as OvertimeBilledType[];
}
// Overtime Rule
export async function getOvertimeRules(): Promise<OvertimeRulesType[]> {
  const overtimeRules = await get("overtimes-rule", ["overtime-rule"]);
  return overtimeRules as OvertimeRulesType[];
}
