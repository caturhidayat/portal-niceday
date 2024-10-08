'use server';

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { SESSION_COOKIE } from "../constant";
import { redirect } from "next/navigation";


export async function getSession() {
  return !!cookies().get(SESSION_COOKIE)?.value;
}

// Set the session cookie
export async function setSession(response: Response) {
  const setSessionHeader = response.headers.get("Set-Cookie");
  // console.log("setSessionHeader", setSessionHeader);
  if (setSessionHeader) {
    const token = setSessionHeader.split(";")[0].split("=")[1];
    cookies().set({
      name: SESSION_COOKIE,
      value: token,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    });
  }
}

// Remove the session cookie
export async function removeSession() {
  cookies().delete(SESSION_COOKIE);
  redirect("/sign-in");
}
