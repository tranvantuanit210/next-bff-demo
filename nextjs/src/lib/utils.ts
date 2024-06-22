import { toast } from "@/components/molecules/use-toast";
import { CommonError, EntityError } from "@/utils/http";
import { type ClassValue, clsx } from "clsx";
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleErrorApi = (error: any, setError?: UseFormSetError<any>, duration?: number) => {
  if (error instanceof EntityError && setError) {
    const errors = error.validationErrors;
    Object.keys(errors).forEach((key) => {
      setError(key, {
        type: "server",
        message: errors[key][0],
      });
    });
  } else if (error instanceof CommonError) {
    toast({
      title: "Error",
      description: error.genericErrors[0],
      variant: "destructive",
      duration: duration || 5000,
    });
  } else {
    toast({
      title: "Error",
      description: error?.message || "Something went wrong",
      variant: "destructive",
      duration: duration || 5000,
    });
  }
};

export const handleErrorNextServer = (error: any) => {
  return Response.json(error, {
    status: error.status || 401,
  });
};

export const toPascalCase = (input: string) => {
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_\-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\s+/g, " ")
    .trim();
};
