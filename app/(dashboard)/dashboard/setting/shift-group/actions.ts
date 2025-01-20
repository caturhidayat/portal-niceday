"use server";

import { del, postRaw } from "@/lib/fetch-wrapper";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const ShiftGroupSchema = z.object({
    name: z.string().min(5, { message: "Name is required. Must be at least 5 characters" }),
    description: z.string().min(5, { message: "Description is required. Must be at least 5 characters" }),
    cycleLength: z.number().min(1, { message: "Cycle length must be at least 1" }),
    startDate: z.string(),
    shiftName: z.array(z.string()).min(1, { message: "At least one shift is required" }),
});

export interface ShiftGroupFormData {
    name: string;
    description: string;
    cycleLength: number;
    startDate: string;
    shiftName: string[];
}

export interface ActionResponseShiftGroup {
    success: boolean;
    message: string;
    errors?: {
        [K in keyof ShiftGroupFormData]?: string[];
    };
    inputs?: ShiftGroupFormData;
}

export default async function createShiftGroup(_prevState: ActionResponseShiftGroup, formData: FormData): Promise<ActionResponseShiftGroup> {
    try {
        console.log("Form Data server action : ", formData);

        // Extract basic fields
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const cycleLength = parseInt(formData.get('cycleLength') as string);
        const startDate = formData.get('startDate') as string;

        // Extract shift IDs
        const shiftName: string[] = [];
        for (let i = 0; i < cycleLength; i++) {
            const dayShift = formData.get(`day-${i + 1}`) as string;
            if (!dayShift) {
                throw new Error(`Shift for day ${i + 1} is required`);
            }
            shiftName.push(dayShift);
        }

        console.log("shiftName : ", shiftName)

        // Validate required fields
        const validatedData = ShiftGroupSchema.safeParse({
            name,
            description,
            cycleLength,
            startDate,
            shiftName,
        });

        // Return error if data is invalid
        if (!validatedData.success) {
            return {
                success: false,
                message: "Please fix the following errors",
                errors: validatedData.error.flatten().fieldErrors,
                inputs: {
                    name,
                    description,
                    cycleLength,
                    startDate,
                    shiftName,
                },
            };
        }

        // Create the request body as a plain object
        const requestBody = {
            name: validatedData.data.name,
            description: validatedData.data.description,
            cycleLength: validatedData.data.cycleLength,
            startDate: validatedData.data.startDate,
            shiftName: validatedData.data.shiftName
        };

        console.log("Request body: ", requestBody);

        // Convert to JSON string and create FormData
        const formDataValidated = new FormData();
        formDataValidated.append('data', JSON.stringify(requestBody));

        const res = await postRaw("shift-group", formDataValidated);

        revalidateTag("shift-group");
        return {
            success: true,
            message: "Shift has been created successfully",
        };
    } catch (error) {
        return {
            success: false,
            message: "Failed to create shift",
        };
    }
}

// Delete Shift Group
export async function deleteShiftGroup(id: string) {
    console.log("delete shift group id : ", id);
    await del("shift-group", id);
    revalidateTag("shift-group");
}


// Create Shift Group by Name
// export async function createShiftGroupByName(data: any) {
//     // transform formData to FormData
//     const formData = new FormData();
//     Object.entries(data).forEach(([key, value]) => {
//         formData.append(key, value);
//     });

//     const res = await post("shift-group", formData);

//     if (res.error) {
//         return { error: "An error occured", success: "" };
//     }

//     revalidateTag("shift-group");
//     return res.data;
// }
