import { cookies } from "next/headers";
import { API_URL } from "./constant";
import { getErrorMessage } from "./error";

export const getHeaders = async () => ({
  Cookie: (await cookies()).toString(),
});

export const post = async (path: string, data: FormData) => {
  console.log("formData : ", data);
  // const body = data instanceof FormData ? Object.fromEntries(data) : data;

  const token = await getHeaders();
  console.log("request body ", data);
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...token },
    body: JSON.stringify(Object.fromEntries(data)),
  });

  const parsedRes = await res.json();
  console.log("parsedRes", parsedRes);
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  } else {
    return { data: parsedRes };
  }
};

export const get = async <T>(path: string, tags?: string[]) => {
  const token = await getHeaders();
  const res = await fetch(`${API_URL}/${path}`, {
    headers: { ...token },
    next: { tags },
  });
  return res.json() as T;
};
