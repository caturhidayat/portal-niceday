"use server";

import { API_URL } from "@/lib/constant";
import { getErrorMessage } from "@/lib/error";
import { getHeaders, post } from "@/lib/fetch-wrapper";
import { revalidateTag } from "next/cache";

export default async function createShiftGroup(formData: any) {
    const response = await fetch(`${API_URL}/shift-group`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getHeaders() },
        body: JSON.stringify(formData),
    });

    const parsedRes = await response.json();
    console.log("parsedRes", parsedRes);
    if (parsedRes.error) {
        return { error: getErrorMessage(parsedRes) };
    } else {
        revalidateTag("shift-group");
        return { data: parsedRes };
    }
}

// Create Shift Group by Name
export async function createShiftGroupByName(data: any) {
    // transform formData to FormData
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        data.append(key, value);
    });

    const res = await post("shift-group", formData);

    if (res.error) {
        return { error: "An error occured", success: "" };
    }

    revalidateTag("shift-group");
    return res.data;
}
