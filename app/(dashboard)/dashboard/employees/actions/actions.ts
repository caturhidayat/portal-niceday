"use server";

import { post } from "@/lib/fetch-wrapper";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const EmployeeSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  username: z.string().min(8, { message: "Username must be at least 8 characters" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  departmentId: z.string().optional(),
  branchId: z.string().optional(),
});

export interface EmployeeFormData {
  name: string;
  username: string;
  password: string;
  departmentId?: string | undefined;
  branchId?: string | undefined;
}

export interface ActionResponseEmployee {
  success: boolean;
  message: string;
  errors?: {
      [K in keyof EmployeeFormData]?: string[]
  }
  inputs?: EmployeeFormData
}


export default async function createEmployee(
  _prevState: ActionResponseEmployee,
  formData: FormData
): Promise<ActionResponseEmployee> {
  try {
    const rawData: any = {
      name: formData.get("name") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    const departmentId = formData.get("departmentId") as string;
    const branchId = formData.get("branchId") as string;

    if (departmentId) rawData.departmentId = departmentId;
    if (branchId) rawData.branchId = branchId;

    // Validate data
    const validatedData = EmployeeSchema.safeParse(rawData);

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

    revalidateTag("employees");

    console.log("res from server action : ", res);

    console.log("validatedData.data :", validatedData.data);

    return {
      success: true,
      message: "Employee has been created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create employee",
    };
  }
}
