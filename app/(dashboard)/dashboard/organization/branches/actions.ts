"use server";

import { post } from "@/lib/fetch-wrapper";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const branchSchema = z.object({
    name: z.string().min(3).max(15),
    location: z.string().optional(),
});

export default async function createBranch(formData: FormData) {
    // const validationFields = branchSchema.safeParse({
    //     name: formData.get("name") as string,
    //     location: formData.get("location") as string,
    // });

    // if (!validationFields.success) {
    //     return {
    //         error: validationFields.error.flatten().fieldErrors,
    //     };
    // }

    const res = await post("branches", formData);
    revalidateTag("branches");
    return res.data;
}
