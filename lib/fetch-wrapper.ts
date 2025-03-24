// 'use server';

import { cookies } from "next/headers";
import { API_URL } from "./constant";
import { getErrorMessage } from "./error";
import { revalidatePath } from "next/cache";

export const getHeaders = async () => ({
  Cookie: (await cookies()).toString(),
});

export const post = async (path: string, data: FormData) => {
  console.log("formData : ", data);
  // const body = data instanceof FormData ? Object.fromEntries(data) : data;

  const token = await getHeaders();
  console.log("request body wrapper : ", data);
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

export const postRaw = async (path: string, formData: FormData) => {
  console.log("formData raw wrapper: ", formData);
  
  const token = await getHeaders();
  const data = JSON.parse(formData.get('data') as string);
  console.log("request body ", data);
  
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...token },
    body: JSON.stringify(data),
  });

  revalidatePath('/', 'layout')

  const parsedRes = await res.json();
  console.log("parsedRes ", parsedRes);
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  } else {
    return { data: parsedRes };
  }
};

export const postJson = async (path: string, data: FormData) => {
  console.log("formData : ", data);
  // const body = data instanceof FormData ? Object.fromEntries(data) : data;

  const token = await getHeaders();
  console.log("request body wrapper : ", data);
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...token },
    body: JSON.stringify(data),
  });

  revalidatePath('/', 'layout')

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
    headers: { ...token, "Content-Type": "application/json" },
    next: { tags },
  });
  return res.json() as T;
};

export const put = async (path: string, id: string, data: FormData, tags?: string[]) => {
  const token = await getHeaders();
  const res = await fetch(`${API_URL}/${path}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...token },
    body: JSON.stringify(Object.fromEntries(data)),
    next: { tags },
  });

  revalidatePath('/', 'layout')
  return res.json();
};

export async function putNoParams(path: string, data: FormData, tags?: string[]) {
  const token = await getHeaders();
  const res = await fetch(`${API_URL}/${path}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...token },
    body: JSON.stringify(Object.fromEntries(data)),
    next: { tags },
  });

  revalidatePath('/', 'layout')
  return res.json();
}

export const del = async (path: string, id: string, tags?: string[]) => {
  const token = await getHeaders();
  const res = await fetch(`${API_URL}/${path}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", ...token },
    next: { tags },
  });

  revalidatePath('/', 'layout')
  return res.json();
};
