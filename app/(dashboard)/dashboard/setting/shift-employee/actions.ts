'use server';

import { post } from "@/lib/fetch-wrapper";
import { revalidateTag } from "next/cache";
import { z } from "zod";

// {
//     "userId": "USR-1737017692425",
//     "shiftGroupId": "SG-1734506156529633",
//     "startDate": "1734282000000"
// }

const ShiftEmployeeSchema = z.object({
    userId: z.string(),
    shiftGroupId: z.string(),
    startDate: z.string({
        required_error: "Start date is required",
    }),
});

export interface ShiftEmployeeFormData {
    userId: string;
    shiftGroupId: string;
    startDate: string;
}

export interface ActionResponseShiftEmployee {
    success: boolean;
    message: string;
    errors?: {
        [K in keyof ShiftEmployeeFormData]?: string[];
    };
    inputs?: ShiftEmployeeFormData;
}

// export default async function createShiftEmployee(_prevState: ActionResponseShiftEmployee, formData: FormData): Promise<ActionResponseShiftEmployee> {
//     try {
//         console.log("Form Data server action : ", formData);

//         // Extract basic fields
//         const userId = formData.get('userId') as string;
//         const shiftGroupId = formData.get('shiftGroupId') as string;
//         const startDate = formData.get('startDate') as string;

//         // Validate required fields
//         const validatedData = ShiftEmployeeSchema.safeParse({
//             userId,
//             shiftGroupId,
//             startDate,
//         });

//         // Return error if data is invalid
//         if (!validatedData.success) {
//             return {
//                 success: false,
//                 message: "Please fix the following errors",
//                 errors: validatedData.error.flatten().fieldErrors,
//                 inputs: {
//                     userId,
//                     shiftGroupId,
//                     startDate,
//                 },
//             };
//         }

//         // Create the request body as a plain object
//         const requestBody = {
//             userId: validatedData.data.userId,
//             shiftGroupId: validatedData.data.shiftGroupId,
//             startDate: validatedData.data.startDate,
//         };

//         console.log("Request body: ", requestBody);

//         // Convert to JSON string and create FormData
//         const formDataValidated = new FormData();
//         formDataValidated.append('data', JSON.stringify(requestBody));

//         // const res = await post("users-shift", formDataValidated);

//         revalidateTag("shift-group");
//         return {
//             success: true,
//             message: "Shift has been created successfully",
//         };
//     } catch (error) {
//         return {
//             success: false,
//             message: "Failed to create shift",
//         };
//     }
// }

const convertTimeToEpoch = (time: string) => {
    const date = new Date(time);
    return date.getTime();
}

export default async function createShiftEmployee(data: { userId: string, shiftGroupId: string | undefined, startDate: string | undefined }) {
    // Validate data

    // Convert startDate to epoch
    data.startDate = convertTimeToEpoch(data.startDate!).toString();

    // transform formData to FormData
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
            formData.append(key, value);
        }
    });

    console.log("Form Data server action : ", formData);

    const res = await post("users-shift", formData);

    console.log("response from server : ", res);

    if (res.error) {
        return { error: res.error, success: "" };
    }

    revalidateTag("shift-group");
    revalidateTag("employees");
    return { success: res.data };
}