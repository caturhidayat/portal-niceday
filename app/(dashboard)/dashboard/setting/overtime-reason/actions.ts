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
export default async function createOvertimeReason(
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

    const res = await post("overtimes/reason", submitData);

    revalidateTag("overtime-reasons");

    return {
      success: true,
      message: "Overtime reason has been created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create shift",
    };
  }
}


// Delete Overtime Reason by ID
export async function deleteOvertimeReason(id: string) {
  const res = await del(`overtimes/reason`, id);
  revalidateTag("overtime-reasons");
  return res.data;
}