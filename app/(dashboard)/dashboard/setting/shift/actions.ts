"use server";

import { get, post } from "@/lib/fetch-wrapper";
import { revalidateTag } from "next/cache";
import { Shift } from "./table/columns";
import { z } from "zod";
import { getTime, parse } from "date-fns";

const ShiftSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    startTime: z.string(),
    endTime: z.string(),
    break: z.string(),
});

export interface ShiftFormData {
    name: string;
    startTime: string;
    endTime: string;
    break: string;
}

export interface ActionResponseShift {
    success: boolean;
    message: string;
    errors?: {
        [K in keyof ShiftFormData]?: string[];
    };
    inputs?: ShiftFormData;
}

const convertTimeToEpoch = (time: string) => {
    const parsedTime = parse(time, "HH:mm", new Date());
    return getTime(parsedTime);
};

// Action for create employee
export default async function createShift(
    _prevState: ActionResponseShift,
    formData: FormData
): Promise<ActionResponseShift> {
    try {
        const rawData: any = {
            name: formData.get("name") as string,
            startTime: formData.get("startTime") as string,
            endTime: formData.get("endTime") as string,
            break: formData.get("break") as string,
        };

        //   Convert time to epoch
        formData.set(
            "startTime",
            convertTimeToEpoch(rawData.startTime).toString()
        );
        formData.set("endTime", convertTimeToEpoch(rawData.endTime).toString());

        // Validate data
        const validatedData = ShiftSchema.safeParse(rawData);

        // Return error if data is invalid
        if (!validatedData.success) {
            return {
                success: false,
                message: "Please fix the following errors",
                errors: validatedData.error.flatten().fieldErrors,
                inputs: rawData,
            };
        }

        // Submit data to server if data is valid
        //   const res = await post("users/signup", formData);
        const res = await post("shifts", formData);

        revalidateTag("shifts");

        // console.log("res from server action : ", res);
        // console.log("validatedData.data :", validatedData.data);
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




// Get All Shift
export async function getAllShift() {
    const res = await get("shifts") as { data: Shift[] };

    return res.data;
}

