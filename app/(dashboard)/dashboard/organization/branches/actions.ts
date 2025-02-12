"use server";

import { post, put } from "@/lib/fetch-wrapper";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const BranchSchema = z.object({
  name: z
    .string()
    .min(6, {
      message: "Name must be at least 6 characters.",
    })
    .max(25, {
      message: "Name must be at most 100 characters.",
    }),
  location: z.string().optional(),
});

export interface BranchFormData {
  name: string;
  location?: string;
}

export interface ActionResponseBranch {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof BranchFormData]?: string[];
  };
  inputs?: BranchFormData;
}

// Action for create employee
export default async function createBranch(
  _prevState: ActionResponseBranch,
  formData: FormData
): Promise<ActionResponseBranch> {
  try {
    const rawData: any = {
      name: formData.get("name") as string,
      location: (formData.get("location") as string) || undefined,
    };

    // Validate data
    const validatedData = BranchSchema.safeParse(rawData);

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
    const res = await post("branches", formData);

    revalidateTag("branches");

    console.log("res from server action : ", res);

    console.log("validatedData.data :", validatedData.data);

    return {
      success: true,
      message: "Branch has been created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create branch",
    };
  }
}

export interface updateBranchFormData {
  name: string;
  location?: string;
}


export interface BranchFormUpdateData {
  name: string;
  location?: string;
}

export interface ActionResponseUpdateBranch {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof BranchFormUpdateData]?: string[];
  };
  inputs?: BranchFormUpdateData;
}

// Action for update employee
export async function updateBranch(
  _prevState: ActionResponseUpdateBranch,
  formData: FormData
): Promise<ActionResponseUpdateBranch> {
  const branchId = formData.get("id") as string;

  console.log("id : ", branchId)
  try {
    // Remove id from formData since it's in the URL
    // const dataToSend = new FormData();
    // for (const [key, value] of formData.entries()) {
    //   if (key !== "id") {
    //     dataToSend.append(key, value);
    //   }
    // }
    const rawData: any = {
      name: formData.get("name") as string,
      location: (formData.get("location") as string) || undefined,
    };

    console.log("rawData : ", rawData);

    // Validate data
    const validatedData = BranchSchema.safeParse(rawData);

    // Return error if data is invalid
    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the following errors",
        errors: validatedData.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }

    console.log("validatedData.data :", validatedData.data);

    // convert data to FormData
    const dataToSend = new FormData();
    dataToSend.append("name", validatedData.data.name);
    dataToSend.append("location", validatedData.data.location || "");

    console.log("dataToSend : ", dataToSend);

    const res = await put(`branches`, branchId, dataToSend);
    console.log("res from server action : ", res);

    revalidateTag("branches");
    return {
      success: true,
      message: "Branch has been updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update branch",
    };
  }
}
