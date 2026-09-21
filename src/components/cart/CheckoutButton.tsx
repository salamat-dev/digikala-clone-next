"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
import { useAuth } from "@/store/auth.store";

/* دکمه‌ی پرداخت — برای مهمان‌ها هشدار ثبت‌نام نشان می‌دهد */
export default function CheckoutButton() {
  const router = useRouter();
  const user = useAuth((state) => state.user);

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  function handleClick() {
    if (!mounted || !user) {
      setOpen(true);
      return;
    }

    toast.success("سفارش شما ثبت شد");
  }

  return (
    <>
      <Button onClick={handleClick} className="w-full py-6 text-sm font-bold">
        پرداخت نهایی
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-right">
              ابتدا وارد حساب شوید
            </AlertDialogTitle>

            <AlertDialogDescription className="text-right leading-7">
              برای تکمیل خرید باید وارد حساب کاربری خود شوید یا ثبت‌نام کنید.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="gap-2 sm:justify-start">
            <AlertDialogAction onClick={() => router.push("/auth")}>
              ورود | ثبت‌نام
            </AlertDialogAction>

            <AlertDialogCancel>بعداً</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}