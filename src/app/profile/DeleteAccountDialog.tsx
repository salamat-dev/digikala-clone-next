"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { TrashIcon } from "@heroicons/react/24/outline";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/services/auth.service";
import { useAuth } from "@/store/auth.store";

/* حذف حساب با تأیید دومرحله‌ای */
export default function DeleteAccountDialog({ userId }: { userId: string }) {
  const router = useRouter();
  const logout = useAuth((state) => state.logout);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);

    try {
      await deleteUser(userId);

      logout();
      toast.success("حساب شما حذف شد");
      router.push("/");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="w-full gap-2 text-destructive hover:bg-destructive hover:text-white"
      >
        <TrashIcon className="h-5 w-5" />
        حذف حساب کاربری
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-right">
              حذف حساب کاربری
            </AlertDialogTitle>

            <AlertDialogDescription className="text-right leading-7">
              با حذف حساب، تمام اطلاعات شما پاک می‌شود و این کار قابل بازگشت
              نیست.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="gap-2 sm:justify-start">
            <AlertDialogAction
              onClick={handleDelete}
              disabled={loading}
              className="bg-destructive hover:bg-destructive/90"
            >
              {loading ? "در حال حذف..." : "بله، حذف کن"}
            </AlertDialogAction>

            <AlertDialogCancel>انصراف</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}