import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/molecules/toaster";

import { cn } from "@/lib/utils";
import AppProvider from "@/provider/app.provider";
import { cookies } from "next/headers";
import { User } from "@/app/(app)/users/types/user.type";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("accessToken")?.value || "";
  let user: User | null = null;
  // if (accessToken) {
  //   await userApi.getMe(access_token).then((res) => {
  //     user = res.data;
  //   });
  // }
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <AppProvider initAccessToken={accessToken} user={user}>
          <Toaster />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
