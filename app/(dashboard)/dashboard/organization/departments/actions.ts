"use server";

import { post } from "@/lib/fetch-wrapper";
import { revalidateTag } from "next/cache";



export default async function createDepartement(formData: FormData) {
    const res = await post("departements", formData);
    revalidateTag("departements");
    return res.data;
}
