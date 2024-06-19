import { User } from "@/app/(app)/users/types/user.type";
import { DialogContent, DialogHeader, DialogTitle, Dialog } from "@/components/molecules/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { useToast } from "../../molecules/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { UserForm } from "./user-form";
import { useRouter } from "next/navigation";
import { UseFormSetError } from "react-hook-form";
import userServices from "@/app/(app)/users/services/user.service";

export interface UserDialogProps {
  user?: User;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function UserDialog({ user, open = false, setOpen }: UserDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  const handleEdit = async (data: User, setError?: UseFormSetError<any>) => {
    setIsLoading(true);
    if (user) {
      await userServices
        .updateUser(data)
        .then((res) => {
          toast({
            title: "Success",
            description: res.message,
          });
          setOpen(false);
          router.refresh();
        })
        .catch((error: any) => {
          console.log(error);
          handleErrorApi(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      await userServices
        .createUser(data)
        .then((res) => {
          toast({
            title: "Success",
            description: res.message,
          });
          setOpen(false);
          router.refresh();
        })
        .catch((error: any) => {
          handleErrorApi(error, setError);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  const handleOpenAutoFocus = (event: Event) => {
    event.preventDefault();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={handleOpenAutoFocus}>
        <DialogHeader>
          <DialogTitle>{user ? "Update User" : "Add User"}</DialogTitle>
        </DialogHeader>
        <UserForm handleSubmit={handleEdit} formValue={user} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
}
