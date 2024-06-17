import { LogLevel, ProtocolMode, Configuration } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID || "",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "http://localhost:3000/",
    postLogoutRedirectUri: "http://localhost:3000/login",
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const authScopes = {
  scopes: ["https://tuyen123.onmicrosoft.com/53c7fe46-77d7-4933-b241-b25491a5b34e/PublicInfo.Read"],
};
