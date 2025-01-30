"use server";

import { get, post } from "@/lib/fetch-wrapper";
import { revalidateTag } from "next/cache";
import z from "zod";

const VendorSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(8, { message: "Description is must be at least 8 characters" }),
});

export interface VendorFormData {
  name: string;
  description: string;
}

export interface ActionResponseVendor {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof VendorFormData]?: string[];
  };
  inputs?: VendorFormData;
}

export async function createVendor(
  _prevState: ActionResponseVendor,
  formData: FormData
): Promise<ActionResponseVendor> {
  try {
    const rawData: any = {
      name: formData.get("name") as string,
      description: (formData.get("description") as string) || undefined,
    };

    // Validate data
    const validatedData = VendorSchema.safeParse(rawData);

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
    const res = await post("vendor", formData);

    revalidateTag("vendor");

    console.log("res from server action : ", res);

    console.log("validatedData.data :", validatedData.data);

    return {
      success: true,
      message: "Vendor has been created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create vendor",
    };
  }
}

export async function getVendors() {
  const res = get("vendor", ["vendor"]);
  return res;
}
