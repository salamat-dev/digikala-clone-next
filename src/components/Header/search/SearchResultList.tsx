import { SearchProduct } from "@/services/search.service";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface SearchResultListProps {
  loading: boolean;
  query: string;
  products: SearchProduct[];
  /* بعد از کلیک روی نتیجه، پنل جستجو را می‌بندد */
  onSelect: () => void;
}

/* فهرست نتایج جستجو */
export default function SearchResultList({
  loading,
  query,
  products,
  onSelect,
}: SearchResultListProps) {
  return (
    <div className="h-full overflow-y-auto hide-scrollbar lg:max-h-[420px]">
      {loading && (
        <div className="p-4 text-center text-sm text-muted-foreground">
          در حال جستجو...
        </div>
      )}

      {!loading && query.trim() && products.length === 0 && (
        <div className="p-4 text-center text-sm text-muted-foreground">
          محصولی پیدا نشد.
        </div>
      )}

      {!loading &&
        products.slice(0, 9).map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            onClick={onSelect}
            className="flex items-center gap-3 border-b px-4 py-3 transition-colors hover:bg-muted"
          >
            <MagnifyingGlassIcon className="h-4 w-4 shrink-0 text-muted-foreground" />

            <div className="flex min-w-0 flex-col gap-1">
              <p className="text-[13px] text-muted-foreground">
                {product.brand}
              </p>

              <h3 className="line-clamp-2 text-sm leading-6 text-blue-950">
                {product.title}
              </h3>
            </div>
          </Link>
        ))}
    </div>
  );
}