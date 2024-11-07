"use server";

import { API_URL } from "@/lib/constant";
import { getErrorMessage } from "@/lib/error";
import { getHeaders, post } from "@/lib/fetch-wrapper";
import { revalidateTag } from "next/cache";

// Get all Employee
export async function getAllEmployee() {
    const res = await fetch(`${API_URL}/users`, {
        headers: getHeaders(),
    });

    const data = await res.json();
    return data;
}
