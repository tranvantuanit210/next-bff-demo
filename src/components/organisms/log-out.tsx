"use client";

import authApis from "@/services/auth.service";
import { Button } from "@/components/atoms/button";
import { useToast } from "@/components/molecules/use-toast";
import { authScopes } from "@/config/auth.config";
import { useMsal } from "@azure/msal-react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

export interface LogoutProps {}

export default function Logout(props: LogoutProps) {
  const { instance } = useMsal();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleLogout = () => {
    setIsLoading(true);
    instance
      .logoutPopup(authScopes as any)
      .then(async (data) => {
        const res = await authApis.logout();
        toast({
          title: "Success",
          description: res.message,
        });
        router.push("/login");
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Button disabled={isLoading} onClick={handleLogout}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Logout
    </Button>
  );
}
