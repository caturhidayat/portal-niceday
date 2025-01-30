"use server";

import { post } from "@/lib/fetch-wrapper";
import { revalidateTag } from "next/cache";



export default async function createDepartement(formData: FormData) {
    const res = await post("departments", formData);
    revalidateTag("departments");
    return res.data;
}
