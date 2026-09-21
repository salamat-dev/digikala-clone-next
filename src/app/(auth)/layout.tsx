/* چیدمان صفحات ورود و ثبت‌نام */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-[80dvh] items-center justify-center overflow-hidden px-4 py-10">
      {/* لکه‌های رنگی پس‌زمینه */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

      <div className="relative w-full">{children}</div>
    </div>
  );
}