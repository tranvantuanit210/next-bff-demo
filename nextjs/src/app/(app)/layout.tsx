"use client";

import * as React from "react";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "@/config/auth.config";

export interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
}
