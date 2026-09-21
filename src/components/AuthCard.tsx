"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import { useAuth } from "@/store/auth.store";

type Mode = "login" | "register";

const CLIP = {
  login: "polygon(0% 0%, 30% 0%, 40% 100%, 0% 100%)",
  register: "polygon(68% 0%, 100% 0%, 100% 100%, 60% 100%)",
};

export default function AuthCard({
  initialMode,
}: {
  initialMode: Mode;
}) {
  const router = useRouter();
  const user = useAuth((state) => state.user);

  const [mode, setMode] = useState<Mode>(initialMode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && user) {
      router.replace("/");
    }
  }, [mounted, user, router]);

  if (mounted && user) return null;

  const isLogin = mode === "login";

  return (
    <div className="relative mx-auto h-115 w-full max-w-5xl overflow-hidden rounded-2xl border bg-background shadow-xl">
      {/* پنل آبی — فقط LG به بالا */}
      <motion.div
        initial={false}
        animate={{ clipPath: CLIP[mode] }}
        transition={{
          duration: 0.7,
          ease: [0.65, 0, 0.35, 1],
        }}
        className="pointer-events-none absolute inset-0 hidden bg-primary lg:block"
      />

      {/* متن خوشامد — فقط LG به بالا */}
      <motion.div
        initial={false}
        animate={{ left: isLogin ? "0%" : "58%" }}
        transition={{
          duration: 0.7,
          ease: [0.65, 0, 0.35, 1],
        }}
        className="absolute inset-y-0 hidden w-[42%] items-center justify-center p-8 text-center text-white lg:flex"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{
              duration: 0.3,
              delay: 0.15,
            }}
            className={isLogin ? "mr-30" : "ml-30"}
          >
            <h2 className="text-xl font-extrabold lg:text-2xl xl:text-3xl">
              {isLogin ? "خوش برگشتی!" : "خوش آمدید!"}
            </h2>

            <p className="mt-4 text-[13px] leading-7 opacity-90">
              {isLogin
                ? "برای ادامه‌ی خرید وارد حساب خود شوید"
                : "با ساخت حساب، خریدهایتان را دنبال کنید"}
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* موبایل و تبلت — بدون پنل آبی و بدون جابه‌جایی */}
      <div className="flex h-full w-full items-center overflow-y-auto px-6 lg:hidden">
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              {isLogin ? (
                <LoginForm
                  onSwitch={() => setMode("register")}
                  direction="left"
                />
              ) : (
                <RegisterForm
                  onSwitch={() => setMode("login")}
                  direction="right"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* دسکتاپ — LG به بالا */}
      <motion.div
        initial={false}
        animate={{
          left: isLogin ? "45%" : "0%",
        }}
        transition={{
          duration: 0.7,
          ease: [0.65, 0, 0.35, 1],
        }}
        className="absolute inset-y-0 hidden w-[55%] items-center overflow-y-auto px-10 lg:flex"
      >
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {isLogin ? (
                <LoginForm
                  onSwitch={() => setMode("register")}
                  direction="left"
                />
              ) : (
                <RegisterForm
                  onSwitch={() => setMode("login")}
                  direction="right"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}