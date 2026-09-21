export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-[80dvh] items-center justify-center overflow-hidden px-4 py-10">

      <div className="relative w-full">
        {children}
      </div>
    </div>
  );
}