"use client";

import { useRouter } from "next/navigation";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

import { cn } from "@/lib/utils";

export default function BackButton({
  label = "بازگشت",
  className,
}: {
  label?: string;
  className?: string;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={cn(
        "flex cursor-pointer items-center gap-1 text-[13px] text-muted-foreground transition-colors hover:text-primary",
        className
      )}
    >
      <ChevronRightIcon className="h-4 w-4" />
      {label}
    </button>
  );
}