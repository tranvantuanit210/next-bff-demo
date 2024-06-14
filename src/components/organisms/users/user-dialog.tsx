import { User } from "@/types/user.type";
import { DialogContent, DialogHeader, DialogTitle, Dialog } from "@/components/molecules/dialog";
import userApis from "@/apis/user.api";
import { Dispatch, SetStateAction, useState } from "react";
import { useToast } from "../../molecules/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { UserForm } from "./user-form";
import { useRouter } from "next/navigation";

export interface UserDialogProps {
  user?: User;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function UserDialog({ user, open = false, setOpen }: UserDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  const handleEdit = async (data: User) => {
    setIsLoading(true);
    if (user) {
      await userApis
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
          handleErrorApi(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      await userApis
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
          handleErrorApi(error);
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
          <DialogTitle>{user ? "Update User" : "Edit User"}</DialogTitle>
        </DialogHeader>
        <UserForm handleSubmit={handleEdit} formValue={user} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
}
