"use server";

import { get } from "@/lib/fetch-wrapper";

export type TLeave = {
  id: string;
  userId: string;
  user: string;
  startDate?: number;
  endDate?: number;
  reason?: string;
  leaveType: string;
  status: string;
  approvedById?: string;
  dayUsed: number;
  imageUrl?: string;
};

enum LeaveType {
  SICK = "SICK",
  ANNUAL = "ANNUAL",
  UNPAID = "UNPAID",
  MATERNITY = "MATERNITY",
  PATERNITY = "PATERNITY",
  BEREAVEMENT = "BEREAVEMENT",
  STUDY = "STUDY",
  OTHER = "OTHER",
}

export async function getLeaves(): Promise<TLeave[]> {
  const response = await get("leaves");
  // console.log("response :", response);
  return response as TLeave[];
}
