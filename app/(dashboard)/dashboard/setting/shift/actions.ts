"use server";

import { get, post } from "@/lib/fetch-wrapper";
import { revalidateTag } from "next/cache";
import { Shift } from "./table/columns";

export default async function createShift(formData: FormData) {
    const res = await post("shifts", formData);

    if (res.error) {
        return { error: "An error occured", success: "" };
    }

    revalidateTag("shifts");
    return res.data;
}


// Get All Shift
export async function getAllShift() {
    const res = await get("shifts") as { data: Shift[]};

    return res.data;
}

