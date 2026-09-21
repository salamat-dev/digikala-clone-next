"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart.store";

/* فقط فیلدهایی که برای سبد لازم است — هم Product و هم ProductDetail با آن می‌خوانند */
interface CartProduct {
  id: number;
  title_fa: string;
  images?: { main?: string };
  price?: { selling_price?: number };
}

interface Props {
  product: CartProduct;
  className?: string;
}

/* دکمه‌ی افزودن به سبد */
export default function AddToCart({ product, className }: Props) {
  const add = useCart((state) => state.add);

  const price = (product.price?.selling_price ?? 0) / 10;

  function handleAdd() {
    add({
      id: product.id,
      title: product.title_fa,
      image: product.images?.main ?? "",
      price,
    });

    toast.success("به سبد خرید اضافه شد", {
      description: product.title_fa,
      action: {
        label: "مشاهده سبد",
        onClick: () => (window.location.href = "/cart"),
      },
    });
  }

  return (
    <Button className={className} onClick={handleAdd}>
      افزودن به سبد خرید
    </Button>
  );
}