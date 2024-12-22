import { cookies } from "next/headers";
import { API_URL } from "./constant";
import { getErrorMessage } from "./error";

export const getHeaders = async () => ({
  Cookie: (await cookies()).toString(),
});

export const get = async (path: string, tags?: string[]) => {
  try {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/${path}`, {
      headers,
      next: tags ? { tags } : undefined,
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error(getErrorMessage(error));
  }
};

export const post = async (path: string, data: FormData) => {
  try {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/${path}`, {
      method: "POST",
      headers,
      body: data,
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.error("Error posting data:", error);
    throw new Error(getErrorMessage(error));
  }
};
