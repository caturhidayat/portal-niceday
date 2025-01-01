"use server";

import { setSession } from "@/lib/auth/sessions";
import { API_URL, SESSION_COOKIE } from "@/lib/constant";
import { getErrorMessage } from "@/lib/error";
import { redirect } from "next/navigation";
import { FormResponse } from "@/lib/interface/form-response.interface";
import { z } from "zod";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export interface AuthFormData {
  username: string;
  password: string;
}

export interface ActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof AuthFormData]?: string[];
  };
  inputs?: AuthFormData;
}

const AuthSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(6, { message: "Username must be at least 6 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default async function login(
  _prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const rawData = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    // Validate data
    const validatedData = AuthSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the following errors",
        errors: validatedData.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }
    console.log("Form Data server action : ", validatedData.data);
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData.data),
    });

    // console.log("res from API : ", res.ok);

    if (!res.ok) {
      return {
        success: false,
        message: "Credentials are incorrect",
        errors: { username: [getErrorMessage(res)] },
        inputs: rawData,
      };
    }

    setSession(res);

    // Get Set-Cookie from response headers
    // const setSessionHeader = res.headers.get("Set-Cookie");
    // console.log("setSessionHeader", setSessionHeader);
    // const token = setSessionHeader?.split(";")[0].split("=")[1];
    // console.log("token", token);
    // const cookieStore = cookies();

    // if (setSessionHeader) {
    //   cookieStore.set({
    //     name: SESSION_COOKIE,
    //     value: token,
    //     secure: true,
    //     httpOnly: true,
    //     expires: new Date(jwtDecode(token!).exp! * 1000),
    //   });

    // } else {
    //   return {
    //     success: false,
    //     message: "Failed to log in",
    //   };
    // }

    // redirect("/dashboard");
    return {
      success: true,
      message: "Login successful",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to log in",
    };
  }
}
