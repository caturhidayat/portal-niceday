"use server";

import { API_URL } from "@/lib/constant";
import { getErrorMessage } from "@/lib/error";
import { getHeaders, post } from "@/lib/fetch-wrapper";
import { FormResponse } from "@/lib/interface/form-response.interface";
import { revalidateTag } from "next/cache";

// Get all Employee
export async function getAllEmployee() {
    const res = await fetch(`${API_URL}/users`, {
        headers: await getHeaders(),
        next: {
            tags: ["employee"],
        }
    });

    const data = await res.json();
    return data;
}


export async function saveAttendance(
    // _prevState: FormResponse,
    formData: FormData
) {
    // console.log("Form Data server action : ", formData);
    // return {
    //     error: "",
    //     success: formData,
    // }

    const res = await post("attendances/entry", formData);

    if (res.error) {
        return { error: res.error, success: "" };
    }   

    revalidateTag("attendances");
    return { success: res.data };
}

// export async function createShift(formData: FormData) {
//     const res = await post("shifts", formData);

//     if (res.error) {
//         return { error: "An error occured", success: "" };
//     }

//     revalidateTag("shifts");
//     return res.data;
// }