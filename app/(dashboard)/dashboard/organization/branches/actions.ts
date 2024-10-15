"use server";

import { post } from "@/lib/fetch-wrapper";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const branchSchema = z.object({
    name: z.string().min(3).max(15),
    location: z.string().optional(),
});

export default async function createBranch(formData: FormData) {

    const res = await post("branches", formData);

    if (res.error) {
        return { error: "An error occured", success: "" };
    }



    revalidateTag("branches");
    return res.data;
}
