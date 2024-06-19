/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from "@/components/atoms/button";
import { useToast } from "@/components/molecules/use-toast";
import { authScopes } from "@/config/auth.config";
import { clientToken } from "@/utils/http";
import { useMsal } from "@azure/msal-react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import authBffServices from "../services/auth.bff.service";

export interface LoginProps {}

export default function Login(props: LoginProps) {
  const { instance } = useMsal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  const handleLogin = () => {
    setIsLoading(true);
    instance
      .loginPopup(authScopes)
      .then(async (res) => {
        await authBffServices.auth(res.accessToken);
        clientToken.setAccessToken(res.accessToken);
        toast({
          title: "Success",
          description: "Login successfully!",
        });
        router.push("/");
        // await fetch("https://graph.microsoft.com/v1.0/me", {
        //   headers: {
        //     Authorization: `Bearer ${res.accessToken}`,
        //   },
        // })
        //   .then((res) => {
        //     console.log(res);
        //   })
        //   .catch((err) => {
        //     console.error(err);
        //   });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="min-h-[100vh] flex justify-center items-center flex-col gap-4">
      <p>Demo BFF App</p>
      <Button disabled={isLoading} onClick={handleLogin}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Login
      </Button>
    </div>
  );
}
