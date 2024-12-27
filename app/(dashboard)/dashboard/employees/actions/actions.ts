"use server";

import { z } from "zod";

const EmployeeSchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string(),
  departmentId: z.string(),
  branchId: z.string(),
});

export interface EmployeeFormData {
  name: string;
  username: string;
  password: string;
  departmentId: string;
  branchId: string;
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
    const rawData = {
      name: formData.get("name") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      departmentId: formData.get("departmentId") as string,
      branchId: formData.get("branchId") as string,
    };

    // Validate data
    const validatedData = EmployeeSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the following errors",
        errors: validatedData.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }

    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(validatedData.data),
    // });

    console.log("validatedData.data", validatedData.data);

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
