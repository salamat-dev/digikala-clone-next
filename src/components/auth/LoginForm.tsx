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
import { login } from "@/services/auth.service";
import { useAuth } from "@/store/auth.store";
import FieldWrapper from "./FieldWrapper";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const schema = z.object({
  email: z.string().email("ایمیل معتبر نیست"),
  pass: z.string().min(4, "رمز عبور حداقل ۴ کاراکتر است"),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  onSwitch: () => void;
  direction: "left" | "right";
}

export default function LoginForm({ onSwitch, direction }: Props) {
  const router = useRouter();
  const setUser = useAuth((state) => state.setUser);

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: { email: "", pass: "" },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setAlert(null);

    try {
      const user = await login(values.email, values.pass);

      setUser(user);
      setAlert({ type: "success", message: `خوش آمدید ${user.fname}` });
      toast.success(`خوش آمدید ${user.fname}`);

      // کمی مکث تا کاربر پیام را ببیند
      setTimeout(() => router.push("/"), 900);
    } catch (error) {
      const message = (error as Error).message;

      setAlert({ type: "error", message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  /* پر کردن خودکار فرم با حساب آزمایشی */
  function fillDemo(checked: boolean) {
    if (checked) {
      form.setValue("email", "admin@gmail.com", { shouldValidate: true });
      form.setValue("pass", "admin", { shouldValidate: true });
    } else {
      form.reset({ email: "", pass: "" });
    }

    setAlert(null);
  }

  return (
    <div className="space-y-6">
      {alert && (
        <FieldWrapper index={1} direction={direction}>
          <FormAlert type={alert.type} message={alert.message} />
        </FieldWrapper>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldWrapper index={1} direction={direction}>
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
          </FieldWrapper>

          <FieldWrapper index={2} direction={direction}>
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
          </FieldWrapper>

          <FieldWrapper index={3} direction={direction}>
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 font-bold"
            >
              {loading ? "در حال ورود..." : "ورود"}
            </Button>
            <div className="flex items-center gap-2 p-3">
              <Checkbox id="demo" onCheckedChange={(v) => fillDemo(v === true)} />

              <Label htmlFor="demo" className="cursor-pointer text-[12px] font-normal">
                ورود با حساب آزمایشی
              </Label>
            </div>
          </FieldWrapper>
        </form>
      </Form>

      <FieldWrapper index={4} direction={direction}>
        <p className="text-center text-[13px] text-muted-foreground">
          حساب ندارید؟{" "}
          <button
            type="button"
            onClick={onSwitch}
            className="cursor-pointer font-bold text-primary hover:underline"
          >
            ثبت‌نام
          </button>
        </p>
      </FieldWrapper>
    </div>
  );
}