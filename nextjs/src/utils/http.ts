import { HttpMethod } from "@/types/common.type";

export type CustomRequestInit = Omit<RequestInit, "method"> & {
  baseUrl?: string;
};
export class HttpError extends Error {
  type: string;
  title: string;
  status: number;
  constructor(payload: { type: string; title: string; status: number }) {
    super("Http Error");
    this.type = payload.type;
    this.title = payload.title;
    this.status = payload.status;
  }
}
export class CommonError extends HttpError {
  genericErrors: string[];
  constructor(payload: { type: string; title: string; status: number; genericErrors: string[] }) {
    super({ type: payload.type, title: payload.title, status: payload.status });
    this.genericErrors = payload.genericErrors;
  }
}
export type EntityErrorType = {
  [p: string]: string[];
};
export class EntityError extends HttpError {
  validationErrors: EntityErrorType;
  constructor(payload: { type: string; title: string; status: 422; validationErrors: EntityErrorType }) {
    super({ type: payload.type, title: payload.title, status: payload.status });
    this.validationErrors = payload.validationErrors;
  }
}

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
    if (res.status === 422 && Object.keys(data as any).includes("validationErrors")) {
      throw new EntityError(data as any);
    }
    throw new CommonError(data as any);
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
