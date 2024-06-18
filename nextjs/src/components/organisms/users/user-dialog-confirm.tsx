import userApis from "@/services/user.service";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/molecules/alert-dialog";
import { handleErrorApi } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";
import { useToast } from "@/components/molecules/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export interface UserDialogConfirmProps {
  userId: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function UserDialogConfirm({ open, setOpen, userId }: UserDialogConfirmProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleOpenAutoFocus = (event: Event) => {
    event.preventDefault();
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleConfirmDeleteUser = async () => {
    if (userId) {
      setIsLoading(true);
      await userApis
        .deleteUser(userId)
        .then((res) => {
          toast({
            title: "Success",
            description: res.message,
          });
          setOpen(false);
          router.refresh();
        })
        .catch((error: any) => {
          handleErrorApi(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent onOpenAutoFocus={handleOpenAutoFocus}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete it?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDeleteUser}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
