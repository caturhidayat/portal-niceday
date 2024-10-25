"use server";

import { post } from "@/lib/fetch-wrapper";
import { revalidateTag } from "next/cache";

export default async function createShiftGroup(formData: FormData) {
    const res = await post("shift-group", formData);

    if (res.error) {
        return { error: "An error occured", success: "" };
    }

    revalidateTag("shift-group");
    return res.data;
}
