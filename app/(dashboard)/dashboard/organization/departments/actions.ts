"use server";

import { post, put } from "@/lib/fetch-wrapper";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const DepartmentSchema = z.object({
  name: z
    .string()
    .min(6, {
      message: "Name must be at least 6 characters.",
    })
    .max(25, {
      message: "Name must be at most 100 characters.",
    }),
});

//   Action for create employee
export default async function createDepartement(formData: FormData) {
  const res = await post("departments", formData);
  revalidateTag("departments");
  return res.data;
}

export interface DepartmentFormUpdateData {
  name: string;
}

export interface ActionResponseUpdateDepartment {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof DepartmentFormUpdateData]?: string[];
  };
  inputs?: DepartmentFormUpdateData;
}

//   Action for Update department
export async function updateDepartment(
  _prevState: ActionResponseUpdateDepartment,
  formData: FormData
): Promise<ActionResponseUpdateDepartment> {
  const departmentId = formData.get("id") as string;

  try {
    const rawData: any = {
      name: formData.get("name") as string,
    };

    // Validate data
    const validatedData = DepartmentSchema.safeParse(rawData);
    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the following errors",
        errors: validatedData.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }

    console.log("rawData : ", rawData);

    // Convert valid data to FormData
    const validData = new FormData();
    validData.append("name", rawData.name);

    const res = await put(`departments`, departmentId, validData);
    console.log("res from server action : ", res);

    revalidateTag("departments");
    return {
      success: true,
      message: "Department has been updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update department",
    };
  }
}
