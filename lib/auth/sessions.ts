"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { SESSION_COOKIE } from "../constant";
import { redirect } from "next/navigation";

export async function getSession() {
  const sessionCookie = (await cookies()).get(SESSION_COOKIE)?.value;
  return sessionCookie;
  // return !!cookies().get(SESSION_COOKIE)?.value;
}

// Set the session cookie
export async function setSession(response: Response) {
  const setSessionHeader = response.headers.get("Set-Cookie");
  const cookieStore = await cookies();
  // console.log("setSessionHeader", setSessionHeader);
  if (setSessionHeader) {
    const token = setSessionHeader.split(";")[0].split("=")[1];
    cookieStore.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(jwtDecode(token).exp! * 1000),
    });
  }
}

// Remove the session cookie
export async function removeSession() {
  // 'use server';
  // const cookieStore = await cookies();
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/sign-in");
}
