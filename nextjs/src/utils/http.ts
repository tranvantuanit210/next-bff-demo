import authBffServices from "@/app/(app)/(auth)/services/auth.bff.service";
import { toast } from "@/components/molecules/use-toast";
import { msalInstance } from "@/config/auth.config";
import { httpStatusCode } from "@/constants/httpStatusCode";
import { HttpMethod } from "@/types/common.type";
import { redirect } from "next/navigation";

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

let clientLogoutRequest: null | Promise<any> = null;

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
    if (res.status === httpStatusCode.UNPROCESSABLE_ENTITY && Object.keys(data as any).includes("validationErrors")) {
      throw new EntityError(data as any);
    } else if (res.status === httpStatusCode.UNAUTHORIZED) {
      if (typeof window !== "undefined") {
        if (!clientLogoutRequest) {
          await msalInstance.logoutRedirect({
            account: msalInstance.getActiveAccount(),
          });
          clientLogoutRequest = authBffServices.logout();
          await clientLogoutRequest;
          clientLogoutRequest = null;
        }
      } else {
        const accessToken = (options?.headers as any).Authorization.split("Bearer ")[1];
        redirect(`/logout?accessToken=${accessToken}`);
      }
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
