"use server";

import { post } from "@/lib/fetch-wrapper";
import { revalidateTag } from "next/cache";



export default async function createOfficeLocation(formData: FormData) {
    const res = await post("office-locations", formData);
    revalidateTag("office-locations");
    return res.data;
}
