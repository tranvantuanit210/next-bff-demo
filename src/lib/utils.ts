import { toast } from "@/components/molecules/use-toast";
import { type ClassValue, clsx } from "clsx";
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleErrorApi = (error: any, setError?: UseFormSetError<any>, duration?: number) => {
  if (error?.status === 422 && setError) {
    const errors = error.payload.errors;
    Object.keys(errors).forEach((key) => {
      setError(key, {
        type: "server",
        message: errors[key].msg,
      });
    });
  } else {
    toast({
      title: "Error",
      description: error?.payload?.message || "Something went wrong",
      variant: "destructive",
      duration: duration || 5000,
    });
  }
};
