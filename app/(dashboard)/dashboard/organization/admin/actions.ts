"use server";

import { post } from "@/lib/fetch-wrapper";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const AdminSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  username: z
    .string()
    .min(8, { message: "Username must be at least 8 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  role: z.string().min(1, { message: "Role is required" }), 
});

export interface AdminFormData {
  name: string;
  username: string;
  password: string;
  role: string;
}

export interface ActionResponseAdmin {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof AdminFormData]?: string[];
  };
  inputs?: AdminFormData;
}

// Action for create employee
export default async function createAdmin(
  _prevState: ActionResponseAdmin,
  formData: FormData
): Promise<ActionResponseAdmin> {
  try {
    const rawData: any = {
      name: formData.get("name") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      role: formData.get("role") as string,
    };

    // Validate data
    const validatedData = AdminSchema.safeParse(rawData);

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
      const res = await post("users/signup", formData);

      if (res.error) {
        return {
          success: false,
          message: res.error,
          inputs: rawData,
        };
      }

    revalidateTag("admin");

      console.log("res from server action : ", res);

    console.log("rawData : ", rawData);
    console.log("validatedData.data :", validatedData.data);

    return {
      success: true,
      message: "Admin has been created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create admin",
    };
  }
}
