"use server";

import { del, get, post, put } from "@/lib/fetch-wrapper";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const EmployeeSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  username: z
    .string()
    .min(8, { message: "Username must be at least 8 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  departmentId: z.string().min(1, { message: "Department is required" }),
  branchId: z.string().min(1, { message: "Branch is required" }),
  vendorId: z.string().min(1, { message: "Vendor is required" }),
});

export interface EmployeeFormData {
  name: string;
  username: string;
  password: string;
  departmentId?: string;
  branchId?: string;
  vendorId?: string;
}

export interface ActionResponseEmployee {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof EmployeeFormData]?: string[];
  };
  inputs?: EmployeeFormData;
}

// Action for create employee
export default async function createEmployee(
  _prevState: ActionResponseEmployee,
  formData: FormData
): Promise<ActionResponseEmployee> {
  try {
    const rawData: any = {
      name: formData.get("name") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      departmentId: formData.get("departmentId") as string,
      branchId: formData.get("branchId") as string,
      vendorId: formData.get("vendorId") as string,
    };

    const departmentId = formData.get("departmentId") as string;
    const branchId = formData.get("branchId") as string;
    const vendorId = formData.get("vendorId") as string;

    if (departmentId) rawData.departmentId = departmentId;
    if (branchId) rawData.branchId = branchId;
    if (vendorId) rawData.vendorId = vendorId;

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

    if (res.error) {
      return {
        success: false,
        message: res.error,
        inputs: rawData,
      };
    }

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

// Action for update employee
const EmployeeUpdateSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  username: z
    .string()
    .min(8, { message: "Username must be at least 8 characters" }),
  departmentId: z.string().optional(),
  branchId: z.string().optional(),
});

export interface EmployeeFormUpdateData {
  name: string;
  username: string;
  departmentId?: string | undefined;
  branchId?: string | undefined;
}

export interface ActionResponseUpdateEmployee {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof EmployeeFormUpdateData]?: string[];
  };
  inputs?: EmployeeFormUpdateData;
}

// Action for update employee
export async function updateEmployee(
  _prevState: ActionResponseUpdateEmployee,
  formData: FormData
) {
  const userId = formData.get("id") as string;

  try {
    // Remove id from formData since it's in the URL
    const dataToSend = new FormData();
    for (const [key, value] of formData.entries()) {
      if (key !== "id") {
        dataToSend.append(key, value);
      }
    }

    console.log("dataToSend : ", dataToSend);

    // const departmentId = dataToSend.get("departmentId") as string;
    // const branchId = dataToSend.get("branchId") as string;

    // if (departmentId) dataToSend.set("departmentId", departmentId);
    // if (branchId) dataToSend.set("branchId", branchId);

    // const rawData: any = {
    //   name: dataToSend.get("name") as string,
    //   username: dataToSend.get("username") as string,
    //   departmentId: dataToSend.get("departmentId") as string,
    //   branchId: dataToSend.get("branchId") as string,
    // };

    // console.log("rawData : ", rawData);

    // // Validate data
    // const validatedData = EmployeeUpdateSchema.safeParse(rawData);

    // console.log("validatedData", validatedData);

    // // Return error if data is invalid
    // if (!validatedData.success) {
    //   return {
    //     success: false,
    //     message: "Please fix the following errors",
    //     errors: validatedData.error.flatten().fieldErrors,
    //     inputs: rawData,
    //   };
    // }

    const res = await put(`users`, userId, dataToSend);
    console.log("res from server action : ", res);

    revalidateTag("employees");
    return {
      success: true,
      message: "Employee has been updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update employee",
    };
  }
}

// ACtion for soft delete employee
export async function softDeleteEmployee(id: string) {
  try {
    const res = await del("users/soft", id);
    console.log("res from server action : ", res);
    revalidateTag("employees");
    return {
      success: true,
      message: "Employee has been deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete employee",
    };
  }
}

// Action for delete employee
export async function deleteEmployee(id: string) {
  try {
    const res = await del("users", id);
    console.log("res from server action : ", res);
    revalidateTag("employees");
    return {
      success: true,
      message: "Employee has been deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete employee",
    };
  }
}

// Wrapper function for get data select input
export async function getData<T>(path: string): Promise<T[]> {
  const response = await get<T>(path);
  return response as T[];
}
