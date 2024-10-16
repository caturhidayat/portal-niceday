"use server";

import { post } from "@/lib/fetch-wrapper";
import { revalidateTag } from "next/cache";

export default async function createShift(formData: FormData) {
    const res = await post("shifts", formData);

    if (res.error) {
        return { error: "An error occured", success: "" };
    }

    revalidateTag("shifts");
    return res.data;
}
