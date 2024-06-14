import * as React from "react";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "@/config/auth.config";

export const msalInstance = new PublicClientApplication(msalConfig);

export interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
}
