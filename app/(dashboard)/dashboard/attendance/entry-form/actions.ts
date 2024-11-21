"use server";

import { API_URL } from "@/lib/constant";
import { getErrorMessage } from "@/lib/error";
import { getHeaders, post } from "@/lib/fetch-wrapper";
import { FormResponse } from "@/lib/interface/form-response.interface";
import { revalidateTag } from "next/cache";

// Get all Employee
export async function getAllEmployee() {
    const res = await fetch(`${API_URL}/users`, {
        headers: getHeaders(),
    });

    const data = await res.json();
    return data;
}


export default async function saveAttendance(
    _prevState: FormResponse,
    formData: FormData
) {

    console.log("Form Data server action : ", formData);

    return {
        error: "",
        success: formData,
    }
    // const res = await fetch(`${API_URL}/auth/login`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         ...getHeaders(),
    //     },
    //     body: JSON.stringify(Object.fromEntries(formData)),
    // });

    // console.log("response from api : ", res);

    // const parsedRes = await res.json();

    // if (!res.ok) {
    //     return { error: getErrorMessage(parsedRes), success: "" };
    // }
}