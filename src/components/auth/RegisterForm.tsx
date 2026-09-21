"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import FormAlert from "./FormAlert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { register } from "@/services/auth.service";
import { useAuth } from "@/store/auth.store";
import FieldWrapper from "./FieldWrapper";

/* قواعد اعتبارسنجی — همه‌ی فیلدها رشته‌اند تا تایپ فرم یکدست بماند */
const schema = z.object({
  firstName: z.string().min(2, "نام حداقل ۲ کاراکتر است"),
  lastName: z.string().min(2, "نام خانوادگی حداقل ۲ کاراکتر است"),
  email: z.string().email("ایمیل معتبر نیست"),
  phoneNum: z
    .string()
    .regex(/^09\d{9}$/, "شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد"),
  addres: z.string().min(10, "آدرس حداقل ۱۰ کاراکتر است"),
  age: z.string().refine((value) => {
    const n = Number(value);
    return Number.isFinite(n) && n >= 10 && n <= 120;
  }, "سن باید بین ۱۰ تا ۱۲۰ باشد"),
  pass: z.string().min(4, "رمز عبور حداقل ۴ کاراکتر است"),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  onSwitch: () => void;
  direction: "left" | "right";
}

export default function RegisterForm({ onSwitch, direction }: Props) {
  const router = useRouter();
  const setUser = useAuth((state) => state.setUser);

  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    // اولین اعتبارسنجی موقع خروج از فیلد، بعدش با هر تایپ
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNum: "",
      addres: "",
      age: "",
      pass: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setAlert(null);

    try {
      const user = await register({
        fname: values.firstName,
        lname: values.lastName,
        email: values.email,
        phoneNum: values.phoneNum,
        addres: values.addres,
        age: Number(values.age),
        pass: values.pass,
      });

      setUser(user);
      setAlert({ type: "success", message: "ثبت‌نام با موفقیت انجام شد" });
      toast.success("ثبت‌نام با موفقیت انجام شد");

      setTimeout(() => router.push("/"), 900);
    } catch (error) {
      const message = (error as Error).message;

      setAlert({ type: "error", message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <FieldWrapper index={0} direction={direction}>
        <h1 className="text-xl font-bold">ثبت‌نام</h1>
      </FieldWrapper>

      {alert && <FormAlert type={alert.type} message={alert.message} />}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FieldWrapper index={1} direction={direction}>
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام خانوادگی</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </FieldWrapper>

          <FieldWrapper index={2} direction={direction}>
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ایمیل</FormLabel>
                    <FormControl>
                      <Input
                        dir="ltr"
                        placeholder="you@example.com"
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
                name="pass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رمز عبور</FormLabel>
                    <FormControl>
                      <Input
                        dir="ltr"
                        type="password"
                        className="text-left"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </FieldWrapper>

          <FieldWrapper index={3} direction={direction}>
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
                        placeholder="09121234567"
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
          </FieldWrapper>

          <FieldWrapper index={4} direction={direction}>
            <FormField
              control={form.control}
              name="addres"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>آدرس</FormLabel>
                  <FormControl>
                    <Input placeholder="تهران، خیابان ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FieldWrapper>

          <FieldWrapper index={5} direction={direction}>
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-5 font-bold"
            >
              {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
            </Button>
          </FieldWrapper>
        </form>
      </Form>

      <FieldWrapper index={6} direction={direction}>
        <p className="text-center text-[13px] text-muted-foreground">
          حساب دارید؟{" "}
          <button
            type="button"
            onClick={onSwitch}
            className="cursor-pointer font-bold text-primary hover:underline"
          >
            ورود
          </button>
        </p>
      </FieldWrapper>
    </div>
  );
}