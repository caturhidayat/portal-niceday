"use server";

import { setSession } from "@/lib/auth/sessions";
import { API_URL } from "@/lib/constant";
import { getErrorMessage } from "@/lib/error";
import { redirect } from "next/navigation";
import { FormResponse } from "@/lib/interface/form-response.interface";

export default async function login(
    _prevState: FormResponse,
    formData: FormData
) {

    console.log("Form Data server action : ", formData);
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
    });

    // console.log("response from api : ", res);

    const parsedRes = await res.json();

    if (!res.ok) {
        return { error: getErrorMessage(parsedRes), success: "" };
    }

    setSession(res);
    redirect("/dashboard");
}


