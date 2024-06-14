/* eslint-disable react/no-unescaped-entities */
"use client";
import authApis from "@/apis/auth.api";
import { Button } from "@/components/atoms/button";
import { useToast } from "@/components/molecules/use-toast";
import { loginRequest } from "@/config/auth.config";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface LoginProps {}

export default function Login(props: LoginProps) {
  const { instance } = useMsal();
  const [accountDetails, setAccountDetails] = useState(null);
  const router = useRouter();
  const { toast } = useToast();
  const handleLogout = () => {
    console.log("logout");
  };
  const handleLogin = () => {
    instance
      .loginPopup(loginRequest)
      .then(async (res) => {
        await authApis.auth(res.accessToken);
        toast({
          title: "Success",
          description: "Login successfully!",
        });
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <AuthenticatedTemplate>
        <p>You're logged in!</p>
        <Button onClick={handleLogout}>Logout</Button>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>Please log in!</p>
        <Button onClick={handleLogin}>Login</Button>
      </UnauthenticatedTemplate>
    </div>
  );
}
