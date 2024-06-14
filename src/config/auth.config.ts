import { LogLevel, ProtocolMode, Configuration } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID || "",
    secretId: process.env.NEXT_PUBLIC_CLIENT_ID || "",
    authority: "https://login.microsoftonline.com/common",
    knownAuthorities: [],
    cloudDiscoveryMetadata: "",
    redirectUri: "http://localhost:3000/",
    postLogoutRedirectUri: "http://localhost:3000/",
    navigateToLoginRequestUrl: true,
    clientCapabilities: ["CP1"],
    protocolMode: "AAD" as ProtocolMode,
  },
  cache: {
    cacheLocation: "sessionStorage",
    temporaryCacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
    secureCookies: false,
    claimsBasedCachingEnabled: true,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean): void => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
      piiLoggingEnabled: false,
    },
    windowHashTimeout: 60000,
    iframeHashTimeout: 6000,
    loadFrameTimeout: 0,
    asyncPopups: false,
  },
  telemetry: {
    application: {
      appName: "My Application",
      appVersion: "1.0.0",
    },
  },
};

export const loginRequest = {
  scopes: ["https://tuyen123.onmicrosoft.com/53c7fe46-77d7-4933-b241-b25491a5b34e/PublicInfo.Read"],
};
