import { API_URL } from "@/lib/constant";
import { getHeaders } from "@/lib/fetch-wrapper";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  // const token = cookieStore.get("token");
  const token = await getHeaders();
  const res = await fetch(`${API_URL}/departments`, {
    headers: {
      // Authorization: `Bearer ${token?.value}`,
      "Content-Type": "application/json", ...token
    },
  });
  const data = await res.json();
  return NextResponse.json(data);
}
