import { Configuration, PublicClientApplication } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID || "",
    authority: process.env.NEXT_PUBLIC_AUTHORITY || "",
    redirectUri: process.env.NEXT_PUBLIC_BASE_URL_NEXT_SERVER || "",
    knownAuthorities: [new URL(process.env.NEXT_PUBLIC_AUTHORITY || "").host],
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const authScopes = {
  scopes: ["offline_access", "openid", process.env.NEXT_PUBLIC_SCOPES || ""],
};


export const msalInstance = new PublicClientApplication(msalConfig);