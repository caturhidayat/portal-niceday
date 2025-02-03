"use server";

import { del, post, put } from "@/lib/fetch-wrapper";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const OvertimeReasonSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  as: z.string().min(1, { message: "As is required" }),
});

export interface OvertimeReasonFormData {
  name: string;
  as: string;
}

export interface ActionResponseOvertimeReason {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof OvertimeReasonFormData]?: string[];
  };
  inputs?: OvertimeReasonFormData;
}

// Action for create employee
export default async function createOvertimeBilled(
  _prevState: ActionResponseOvertimeReason,
  formData: FormData
): Promise<ActionResponseOvertimeReason> {
  try {
    const rawData: any = {
      name: formData.get("name") as string,
      as: formData.get("as") as string,
    };

    // Validate data
    const validatedData = OvertimeReasonSchema.safeParse(rawData);
    // Return error if data is invalid
    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the following errors",
        errors: validatedData.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }

    // Parse validated data to FormData
    const submitData = new FormData();
    submitData.append("name", rawData.name);
    submitData.append("as", rawData.as);

    const res = await post("overtimes-billed", submitData);

    revalidateTag("overtime-billed");

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


// Delete Overtime Reason by ID
export async function deleteOvertimeBilled(id: string) {
  const res = await del(`overtimes-billed`, id);
  revalidateTag("overtime-billed");
  return res.data;
}