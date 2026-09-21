import AuthCard from "@/components/AuthCard";

interface Props {
  searchParams: Promise<{ mode?: string }>;
}

/* صفحه‌ی ورود و ثبت‌نام — حالت از URL خوانده می‌شود */
export default async function AuthPage({ searchParams }: Props) {
  const { mode } = await searchParams;

  return <AuthCard initialMode={mode === "register" ? "register" : "login"} />;
}