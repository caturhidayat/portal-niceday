import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { SESSION_COOKIE } from "../constant";


export async function getSession() {
  return !!cookies().get(SESSION_COOKIE)?.value;
}

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

export default function authenticated() {
    return !!cookies().get(SESSION_COOKIE)?.value;
}