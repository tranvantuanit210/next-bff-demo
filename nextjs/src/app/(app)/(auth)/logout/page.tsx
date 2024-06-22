/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import authBffServices from "../services/auth.bff.service";
import { clientToken } from "@/utils/http";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { path } from "@/constants/path";
import { msalInstance } from "@/config/auth.config";

export interface LogoutProps {}

export default function Logout(props: LogoutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("accessToken");
  useEffect(() => {
    setTimeout(() => {
      if (accessToken === clientToken.getAccessToken()) {
        msalInstance
          .logoutPopup({
            account: msalInstance.getActiveAccount(),
          })
          .then(async () => {
            await authBffServices.logout();
            clientToken.setAccessToken("");
            router.push(path.login);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }, 0);
  }, []);

  return (
    <div className="h-screen flex justify-center items-center flex-col gap-1 text-center">
      <p className="text-2xl font-semibold">Unauthorize</p>
      <p>Please log in again!</p>
      <Button>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Auto logouting...
      </Button>
    </div>
  );
}
