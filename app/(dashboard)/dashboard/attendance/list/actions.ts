"use server";

import { revalidateTag } from "next/cache";
import { del, get, post, postRaw, put } from "@/lib/fetch-wrapper";
import { Attendance } from "../today/columns";
import { z } from "zod";
import {
  addDays,
  differenceInSeconds,
  format,
  fromUnixTime,
  getTime,
  setHours,
  setMinutes,
} from "date-fns";
import { fromZonedTime } from "date-fns-tz";

const AttendanceSchema = z.object({
  userId: z.string().min(1, { message: "User is required" }),
  attendanceDate: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

export interface AttendanceFormData {
  userId: string;
  attendanceDate: string;
  startTime: string;
  endTime: string;
}

export interface ActionResponseAttendance {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof AttendanceFormData]?: string[];
  };
  inputs?: AttendanceFormData;
}

// Fungsi untuk mengatur waktu dari string format "HH:mm"
const setTimeFromString = (epochTimestamp: string, timeString: string) => {
  // Parse timeString format "HH:mm"
  const [hours, minutes] = timeString.split(':').map(Number)

  // Buat Date object dari epoch timestamp
  // const date = new Date(+epochTimestamp)
  const date = fromUnixTime(+epochTimestamp)

  // Set jam dan menit
  const withHours = setHours(date, hours)
  const withMinutes = setMinutes(withHours, minutes)

  return withMinutes.getTime().toString();
}

// Create Attendance
export async function createAttendance(
  _prevData: ActionResponseAttendance,
  formData: FormData
): Promise<ActionResponseAttendance> {
  try {
    // console.log("formData server action : ", formData);

    const attendanceDate = formData.get("attendanceDate") as string;
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const diffTime = differenceInSeconds(
      new Date(setMinutes(setHours(+attendanceDate, endHour), endMinute)),
      new Date(setMinutes(setHours(+attendanceDate, startHour), startMinute))
    );

    let isNextDay = false;
    if (diffTime < 0) {
      isNextDay = true;
    }

    const addOne = addDays(+attendanceDate, 1).getTime().toString();
    console.log("addOne server action : ", addOne);

    console.log("diffTime server action : ", diffTime);

    // console.log("isNextDay server action : ", isNextDay);

    // const start = setTimeFromString(attendanceDate, startTime);
    // const end = setTimeFromString(attendanceDate, endTime);


    // Buat date dengan timezone Asia/Jakarta
    const checkInDate = setMinutes(setHours(new Date(+attendanceDate), startHour), startMinute);
    const checkOutDate = setMinutes(setHours(new Date(+attendanceDate), endHour), endMinute);

    // Konversi ke UTC dengan mempertahankan waktu lokal
    const checkInTime = fromZonedTime(checkInDate, 'Asia/Jakarta').getTime().toString();
    const checkOutTime = fromZonedTime(checkOutDate, 'Asia/Jakarta').getTime().toString();



    const nextDay = addDays(checkOutTime, 1);

    const rawData: any = {
      userId: formData.get("userId") as string,
      attendanceDate: attendanceDate,
      // startTime: new Date(
      //   setMinutes(setHours(+attendanceDate, startHour), startMinute)
      // )
      //   .getTime()
      //   .toString(),
      // endTime: isNextDay
      //   ? new Date(
      //       addDays(
      //         setMinutes(setHours(+attendanceDate, endHour), endMinute),
      //         1
      //       )
      //     )
      //       .getTime()
      //       .toString()
      //   : new Date(setMinutes(setHours(+attendanceDate, endHour), endMinute))
      //       .getTime()
      //       .toString(),
      startTime: checkInTime,
      endTime: isNextDay ? nextDay.getTime().toString() : checkOutTime,
    };

    // console.log("rawData server action : ", rawData);

    const validateData = AttendanceSchema.safeParse(rawData);
    if (!validateData.success) {
      return {
        success: false,
        message: "Please fix the following errors",
        errors: validateData.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }

    // Convert rawData to FormData
    const submitData = new FormData();
    submitData.append("userId", rawData.userId);
    submitData.append("attendanceDate", rawData.attendanceDate);
    submitData.append("startTime", rawData.startTime);
    submitData.append("endTime", rawData.endTime);

    const res = await post("attendances/entry", submitData);

    if (res.error) {
      return {
        success: false,
        message: "Failed to create attendance" + " " + res.error,
      };
    }
    console.log("res server action : ", res);

    revalidateTag("attendances");

    return {
      success: true,
      message: "Attendance has been created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create attendance",
    };
  }
}

// Get all attendance
export async function getAttendance(): Promise<Attendance[]> {
  const response = await get("attendances", ["attendances"]);
  return response as Attendance[];
}

const updateAttendanceSchema = z.object({
  userId: z.string().min(1, { message: "User is required" }),
  attendanceDate: z.string(),
  checkInTime: z.string().min(4, { message: "Check in time is required" }),
  checkOutTime: z.string().min(4, { message: "Check out time is required" }),
});

export interface updateAttendanceFormData {
  userId: string;
  attendanceDate: string;
  checkInTime: string;
  checkOutTime: string;
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

// Delete attendance
export async function deleteAttendance(attendanceId: string) {
  console.log("delete attendance id : ", attendanceId);
  await del("attendances", attendanceId);
  revalidateTag("attendances");
}
