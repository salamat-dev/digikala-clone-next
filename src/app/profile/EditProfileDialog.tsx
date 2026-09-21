"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateUser } from "@/services/auth.service";
import { useAuth } from "@/store/auth.store";
import type { User } from "@/types/user";

/* ایمیل و رمز اینجا ویرایش نمی‌شوند تا فرم ساده بماند */
const schema = z.object({
  fname: z.string().min(2, "نام حداقل ۲ کاراکتر است"),
  lname: z.string().min(2, "نام خانوادگی حداقل ۲ کاراکتر است"),
  phoneNum: z
    .string()
    .regex(/^09\d{9}$/, "شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد"),
  addres: z.string().min(10, "آدرس حداقل ۱۰ کاراکتر است"),
  age: z.string().refine((value) => {
    const n = Number(value);
    return Number.isFinite(n) && n >= 10 && n <= 120;
  }, "سن باید بین ۱۰ تا ۱۲۰ باشد"),
});

type FormValues = z.infer<typeof schema>;

/* دیالوگ ویرایش اطلاعات کاربر */
export default function EditProfileDialog({ user }: { user: User }) {
  const setUser = useAuth((state) => state.setUser);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      fname: user.fname,
      lname: user.lname,
      phoneNum: user.phoneNum,
      addres: user.addres,
      age: String(user.age),
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);

    try {
      const updated = await updateUser(user.id, {
        fname: values.fname,
        lname: values.lname,
        phoneNum: values.phoneNum,
        addres: values.addres,
        age: Number(values.age),
      });

      setUser(updated);
      toast.success("اطلاعات با موفقیت به‌روز شد");
      setOpen(false);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  /* با هر بار باز شدن، فرم به مقادیر فعلی کاربر برمی‌گردد */
  function handleOpenChange(next: boolean) {
    if (next) {
      form.reset({
        fname: user.fname,
        lname: user.lname,
        phoneNum: user.phoneNum,
        addres: user.addres,
        age: String(user.age),
      });
    }

    setOpen(next);
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => handleOpenChange(true)}
        className="w-full"
      >
        ویرایش اطلاعات
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent dir="rtl" className="lg:w-120 lg:h-90 w-110 h-80">
          <DialogHeader>
            <DialogTitle className="text-center text-[14px] border-b pb-3">
              ویرایش اطلاعات
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="fname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نام</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نام خانوادگی</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="phoneNum"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>شماره موبایل</FormLabel>
                      <FormControl>
                        <Input
                          dir="ltr"
                          inputMode="numeric"
                          className="text-left"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>سن</FormLabel>
                      <FormControl>
                        <Input
                          dir="ltr"
                          inputMode="numeric"
                          className="text-left"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="addres"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>آدرس</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2 pt-2">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className='flex-1'
                  onClick={() => setOpen(false)}
                >
                  انصراف
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}