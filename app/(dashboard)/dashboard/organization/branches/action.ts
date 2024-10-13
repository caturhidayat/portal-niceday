"use server";

import { post } from "@/lib/fetch-wrapper";
import { revalidateTag } from "next/cache";

export default async function createBranch(formData: FormData) {
    const res = await post("branches", formData);
    revalidateTag("branches");
    return res;
}
