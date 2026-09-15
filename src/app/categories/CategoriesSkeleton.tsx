/* اسکلتون ستون دسته‌ها و محتوای آن */
import { Skeleton } from "@/components/ui/skeleton";

const SIDEBAR_ITEMS = 10;
const ACCORDION_ITEMS = 10;

export default function CategoriesSkeleton() {
  return (
    <div className="grid h-[calc(100dvh-128px)] grid-cols-[80px_1fr] md:grid-cols-[110px_1fr] lg:hidden">

      {/* Right — sidebar */}
      <aside className="overflow-y-auto  hide-scrollbar">
        {Array.from({ length: SIDEBAR_ITEMS }).map((_, i) => (
          <div
            key={i}
            className="w-full min-h-16 md:min-h-18 px-2 flex flex-col justify-center items-center gap-1.5 border"
          >
            <Skeleton className="h-5 w-5 rounded-sm" />
            <Skeleton className="h-2.5 w-10 rounded" />
          </div>
        ))}
      </aside>

      {/* Left — content */}
      <main className="overflow-y-auto bg-background hide-scrollbar">

        {/* "همه محصولات ..." link */}
        <div className="flex items-center gap-1 px-4 py-3">
          <Skeleton className="h-3 w-24 rounded" />
          <Skeleton className="h-3 w-3 rounded-sm" />
        </div>

        {/* accordion items */}
        {Array.from({ length: ACCORDION_ITEMS }).map((_, i) => (
          <div
            key={i}
            className="border-b border-border/50 px-4 py-5 mt-2 sm:mt-1 md:mt-0"
          >
            <Skeleton className="h-3.5 w-28 rounded" />
          </div>
        ))}

      </main>
    </div>
  );
}