"use server";

import { del, get, post } from "@/lib/fetch-wrapper";
import { revalidateTag } from "next/cache";
import z from "zod";
import { OvertimeBilledType } from "./table/columns";

const BilledSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

export interface BilledFormData {
  name: string;
}

export interface ActionResponseBilled {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof BilledFormData]?: string[];
  };
  inputs?: BilledFormData;
}

export async function createBilled(
  _prevState: ActionResponseBilled,
  formData: FormData
): Promise<ActionResponseBilled> {
  try {
    const rawData: any = {
      name: formData.get("name") as string,
    };
    // Validate data
    const validatedData = BilledSchema.safeParse(rawData);
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
    const res = await post("overtimes-billed", formData);

    revalidateTag("overtimes-billed");

    // console.log("res from server action : ", res);

    // console.log("validatedData.data :", validatedData.data);

    return {
      success: true,
      message: "Overtime billed has been created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create overtime billed",
    };
  }
}

export async function getOvertimesBilled(): Promise<OvertimeBilledType[]> {
  const res = await get("overtimes-billed", ["overtime-billed"]);
  return res as OvertimeBilledType[];
}

export async function deleteOvertimeBilled(id: string) {
  const res = await del(`overtimes-billed`, id);
  revalidateTag("overtime-billed");
  return res.data;
}
