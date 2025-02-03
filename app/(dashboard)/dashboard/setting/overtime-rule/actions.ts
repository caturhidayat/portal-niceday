"use server";

import { del, post, put } from "@/lib/fetch-wrapper";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const OvertimeReasonSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  isActive: z.boolean(),
});

export interface OvertimeReasonFormData {
  name: string;
  description: string;
  isActive: boolean;
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
export default async function createOvertimeRule(
  _prevState: ActionResponseOvertimeReason,
  formData: FormData
): Promise<ActionResponseOvertimeReason> {
  try {
    const rawData: any = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
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
    submitData.append("description", rawData.description);
    submitData.append("isActive", rawData.isActive.toString());

    const res = await post("overtime-rule", submitData);

    revalidateTag("overtime-rule");

    return {
      success: true,
      message: "Overtime rule has been created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create overtime rule",
    };
  }
}


// Delete Overtime Reason by ID
export async function deleteOvertimeBilled(id: string) {
  const res = await del(`overtimes-billed`, id);
  revalidateTag("overtime-billed");
  return res.data;
}