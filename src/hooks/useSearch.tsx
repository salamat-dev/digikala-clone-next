import { useEffect, useState } from "react";
import { SearchProduct, SearchProducts } from "@/services/search.service";

/* منطق جستجوی زنده: دیبانس ورودی، فراخوانی سرویس و نگهداری نتایج */
export function useSearch(query: string) {
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [productsQuery, setProductsQuery] = useState("");

  useEffect(() => {
    const keyword = query.trim();

    if (!keyword) {
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);

      try {
        const result = await SearchProducts(keyword);

        setProducts(result.products);
        setProductsQuery(keyword);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [query]);

  const visibleProducts =
    query.trim() === productsQuery ? products : [];

  return {
    products: visibleProducts,
    loading,
  };
}