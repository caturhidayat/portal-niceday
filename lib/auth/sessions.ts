import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { SESSION_COOKIE } from "../constant";


export async function getSession() {
  return !!cookies().get(SESSION_COOKIE)?.value;
}

export async function setSession(response: Response) {
  const setSessionHeader = response.headers.get("Set-Cookie");
  console.log("setSessionHeader", setSessionHeader);
  if (setSessionHeader) {
    const session = setSessionHeader.split(";")[0].split("=")[1];
    cookies().set({
      name: SESSION_COOKIE,
      value: session,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(session).exp! * 1000),
    });
  }
}