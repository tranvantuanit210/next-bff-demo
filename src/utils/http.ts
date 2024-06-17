import { HttpMethod } from "@/types/common.type";

export type CustomRequestInit = Omit<RequestInit, "method"> & {
  baseUrl?: string;
};

class ClientToken {
  private accessToken = "";

  getAccessToken() {
    return this.accessToken;
  }
  setAccessToken(accessToken: string) {
    if (typeof window === "undefined") {
      throw new Error("Cannot set access token on server side");
    }
    this.accessToken = accessToken;
  }
}

export const clientToken = new ClientToken();

const request = async <Response>(method: HttpMethod, url: string, options?: CustomRequestInit) => {
  const body = options?.body ? (options.body instanceof FormData ? options.body : JSON.stringify(options.body)) : undefined;
  const baseHeader = options?.body instanceof FormData ? {} : { "Content-Type": "application/json" };
  const baseUrl = options?.baseUrl === undefined ? process.env.NEXT_PUBLIC_BASE_URL : process.env.NEXT_PUBLIC_BASE_URL_NEXT_SERVER;
  const fullUrl = url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeader,
      ...options?.headers,
    } as any,
    method,
    body,
  });

  const data: Response = await res.json();
  if (!res.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data;
};

const http = {
  get: <Response>(url: string, options?: Omit<CustomRequestInit, "body">) => request<Response>("GET", url, options),
  post: <Response>(url: string, body: any, options?: Omit<CustomRequestInit, "body">) => request<Response>("POST", url, { ...options, body }),
  put: <Response>(url: string, body?: any, options?: Omit<CustomRequestInit, "body">) => request<Response>("PUT", url, { ...options, body }),
  delete: <Response>(url: string, body?: any, options?: Omit<CustomRequestInit, "body">) => request<Response>("DELETE", url, { ...options, body }),
};

export default http;
