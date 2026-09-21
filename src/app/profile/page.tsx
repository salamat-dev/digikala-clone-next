"use client";

import EditProfileDialog from "./EditProfileDialog";
import DeleteAccountDialog from "./DeleteAccountDialog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CakeIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BackButton from "@/components/BackButton";
import { useAuth } from "@/store/auth.store";

/* صفحه‌ی پروفایل کاربر */
export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mounted && !user) router.replace("/auth");
  }, [mounted, user, router]);

  if (!mounted || !user) return null;

  const rows = [
    { Icon: EnvelopeIcon, label: "ایمیل", value: user.email },
    { Icon: PhoneIcon, label: "شماره موبایل", value: user.phoneNum },
    { Icon: CakeIcon, label: "سن", value: `${user.age} سال` },
    { Icon: MapPinIcon, label: "آدرس", value: user.addres },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-4">
      <BackButton className="mb-3" />

      <Card>
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <UserCircleIcon className="h-10 w-10" />
            </span>

            <div>
              <h1 className="text-lg font-bold">
                {user.fname} {user.lname}
              </h1>

              <p className="text-[12px] text-muted-foreground">
                شناسه کاربری: {user.id}
              </p>
            </div>
          </div>

          <Separator />

          <ul className="space-y-4">
            {rows.map(({ Icon, label, value }) => (
              <li key={label} className="flex items-start gap-3">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

                <div className="min-w-0">
                  <p className="text-[12px] text-muted-foreground">{label}</p>
                  <p className="text-[13px]">{value}</p>
                </div>
              </li>
            ))}
          </ul>

          <Separator />

          <div className="space-y-3">
            <EditProfileDialog user={user} />

            <Button
              variant="outline"
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="w-full gap-2"
            >
              <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
              خروج از حساب
            </Button>

            <DeleteAccountDialog userId={user.id} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}