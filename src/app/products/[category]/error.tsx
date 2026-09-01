"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20">
      <p className="text-sm text-muted-foreground">
        دریافت محصولات این دسته‌بندی با مشکل مواجه شد.
      </p>

      <button
        onClick={reset}
        className="rounded-md border px-4 py-2 text-[13px] transition-colors hover:border-primary hover:text-primary"
      >
        دوباره تلاش کن
      </button>
    </div>
  );
}
