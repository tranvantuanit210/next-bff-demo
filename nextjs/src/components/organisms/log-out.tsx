"use client";

import * as React from "react";
import { Button } from "@/components/atoms/button";
import { useToast } from "@/components/molecules/use-toast";
import { authScopes } from "@/config/auth.config";
import { useMsal } from "@azure/msal-react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import authBffServices from "@/app/(app)/(auth)/services/auth.bff.service";
import { path } from "@/constants/path";

export interface LogoutProps {}

export default function Logout(props: LogoutProps) {
  const { instance } = useMsal();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const handleLogout = () => {
    setIsLoading(true);
    instance
      .logoutPopup({
        account: instance.getActiveAccount(),
      })
      .then(async () => {
        const res = await authBffServices.logout();
        toast({
          title: "Success",
          description: res.message,
        });
        router.push(path.login);
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
