'use server';

import { putNoParams } from "@/lib/fetch-wrapper";
import z from "zod";

const ResetPasswordSchema = z.object({
    userId: z.string().min(1, { message: "User is required" }),
  });
  
  export interface ResetPasswordFormData {
    userId: string;
  }
  
  export interface ActionResponseResetPassword {
    success: boolean;
    message: string;
    errors?: {
      [K in keyof ResetPasswordFormData]?: string[];
    };
    inputs?: ResetPasswordFormData;
  }


// Action for create employee
export default async function resetPassword(
    _prevState: ActionResponseResetPassword,
    formData: FormData
  ): Promise<ActionResponseResetPassword> {
    try {
      const rawData: any = {
        userId: formData.get("userId") as string,
      };
      
      // Validate data
      const validatedData = ResetPasswordSchema.safeParse(rawData);
  
      // Return error if data is invalid
      if (!validatedData.success) {
        return {
          success: false,
          message: "Please fix the following errors",
          errors: validatedData.error.flatten().fieldErrors,
          inputs: rawData,
        };
      }
  
      // Convert valid data to FormData
      const submitData = new FormData();
      submitData.append("userId", rawData.userId);
  
      // Submit data to server if data is valid
      const res = await putNoParams("users/reset-password", submitData);
  
      console.log("res server action : ", res);
      
      return {
        success: true,
        message: res.data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to reset password",
      };
    }
  }