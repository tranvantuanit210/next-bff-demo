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
  scopes: [process.env.NEXT_PUBLIC_SCOPES || ""],
};
