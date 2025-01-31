"use server";

import { del, get, post } from "@/lib/fetch-wrapper";
import { revalidateTag } from "next/cache";
import { Shift } from "./table/columns";
import { z } from "zod";
import { getTime, parse, setHours, setMinutes } from "date-fns";

const ShiftSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  startTime: z.string(),
  endTime: z.string(),
  break: z.string(),
});

export interface ShiftFormData {
  name: string;
  startTime: string;
  endTime: string;
  break: string;
}

export interface ActionResponseShift {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof ShiftFormData]?: string[];
  };
  inputs?: ShiftFormData;
}

// const convertTimeToEpoch = (time: string) => {
//   const parsedTime = parse(time, "HH:mm", new Date());
//   return getTime(parsedTime);
// };

// Fungsi untuk mengatur waktu dari string format "HH:mm"
const setTimeFromString = (epochTimestamp: string, timeString: string) => {
  // Parse timeString format "HH:mm"
  const [hours, minutes] = timeString.split(':').map(Number)
  
  // Buat Date object dari epoch timestamp
  const date = new Date(+epochTimestamp)
  
  // Set jam dan menit
  const withHours = setHours(date, hours)
  const withMinutes = setMinutes(withHours, minutes)
  
  return withMinutes.getTime().toString();
}

// Action for create employee
export default async function createShift(
  _prevState: ActionResponseShift,
  formData: FormData
): Promise<ActionResponseShift> {
  const today = new Date().getTime().toString();
  try {
    const rawData: any = {
      name: formData.get("name") as string,
      startTime: formData.get("startTime") as string,
      endTime: formData.get("endTime") as string,
      break: formData.get("break") as string,
    };

    //   Convert time to epoch
    formData.set("startTime", setTimeFromString(today, rawData.startTime).toString());
    formData.set("endTime", setTimeFromString(today, rawData.endTime).toString());

    // Validate data
    const validatedData = ShiftSchema.safeParse(rawData);

    // Return error if data is invalid
    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the following errors",
        errors: validatedData.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }

    // Submit data to server if data is valid
    //   const res = await post("users/signup", formData);
    const res = await post("shifts", formData);

    revalidateTag("shifts");

    // console.log("res from server action : ", res);
    // console.log("validatedData.data :", validatedData.data);
    return {
      success: true,
      message: "Shift has been created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create shift",
    };
  }
}

// Get All Shift
export async function getAllShift() {
  const res = (await get("shifts")) as { data: Shift[] };

  return res.data;
}

// Delete Shift by ID
export async function deleteShift(id: string) {
  const res = await del(`shifts`, id);
  revalidateTag("shifts");
  return res.data;
}
