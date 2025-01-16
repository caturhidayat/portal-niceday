"use server";

import { post } from "@/lib/fetch-wrapper";
import { z } from "zod";

const ReportAttendanceSchema = z.object({
  userId: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  attendanceStatus: z.string().optional(),
  groupBy: z.string().optional(),
  showLegend: z.string().optional(),
});

export interface ReportAttendanceFormData {
  userId: string[];
  startDate: string;
  endDate: string;
  attendanceStatus?: string;
  groupBy?: string;
  showLegend?: string;
}

export interface ActionResponseReportAttendance {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof ReportAttendanceFormData]?: string[];
  };
  inputs?: ReportAttendanceFormData;
}

// Action for create employee
export default async function generateReportAttendance(
  _prevState: ActionResponseReportAttendance,
  formData: FormData
): Promise<ActionResponseReportAttendance> {
  try {
    const rawData: any = {
      userId: JSON.stringify(
        formData.getAll("selectedEmployees[]").map((v) => v.toString())
      ),
      startDate: formData.get("rangeFrom") as string,
      endDate: formData.get("rangeTo") as string,
      attendanceStatus:
        formData.get("attendanceStatus")?.toString() || undefined,
      groupBy: formData.get("groupBy")?.toString() || undefined,
      showLegend: formData.get("showLegend")?.toString() || undefined,
    };

    console.log("rawData : ", rawData);

    // Validate data
    const validatedData = ReportAttendanceSchema.safeParse(rawData);

    console.log("validatedData :", validatedData);
    // Return error if data is invalid
    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the following errors",
        errors: validatedData.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }

    // Transform raw data to form data
    const data = new FormData();
    data.append("userId", validatedData.data.userId);
    data.append("startDate", validatedData.data.startDate);
    data.append("endDate", validatedData.data.endDate);
    data.append("attendanceStatus", validatedData.data.attendanceStatus!);
    data.append("groupBy", validatedData.data.groupBy!);
    data.append("showLegend", validatedData.data.showLegend!);

    // Submit data to server if data is valid
    // const res = await post("attendances/report", data);
    const res = fetch("/attendances/report", {
      method: "POST",
      body: data,
    })
    console.log("res from server action : ", res);

    // revalidateTag("employees");

    // console.log("res from server action : ", res);

    console.log("validatedData.data :", validatedData.data);

    return {
      success: true,
      message: "Employee has been created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create employee",
    };
  }
}
