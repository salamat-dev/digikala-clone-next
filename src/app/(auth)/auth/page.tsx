import AuthCard from "@/components/AuthCard";

interface Props {
  searchParams: Promise<{
    mode?: string;
  }>;
}

export default async function AuthPage({
  searchParams,
}: Props) {
  const { mode } = await searchParams;

  return (
    <AuthCard
      initialMode={
        mode === "register"
          ? "register"
          : "login"
      }
    />
  );
}