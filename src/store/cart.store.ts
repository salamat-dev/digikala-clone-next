import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  title: string;
  image: string;
  /* قیمت به تومان */
  price: number;
  count: number;
}

interface CartState {
  items: CartItem[];
  add: (item: Omit<CartItem, "count">) => void;
  remove: (id: number) => void;
  plus: (id: number) => void;
  minus: (id: number) => void;
  clear: () => void;
}

/* سبد خرید — در localStorage ذخیره می‌شود تا با رفرش پاک نشود */
export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      add: (item) =>
        set((state) => {
          const exist = state.items.find((i) => i.id === item.id);

          // اگر از قبل هست، فقط تعدادش زیاد می‌شود
          if (exist) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, count: i.count + 1 } : i
              ),
            };
          }

          return { items: [...state.items, { ...item, count: 1 }] };
        }),

      remove: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      plus: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, count: i.count + 1 } : i
          ),
        })),

      // با رسیدن به یک، آیتم از سبد حذف می‌شود
      minus: (id) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.id === id ? { ...i, count: i.count - 1 } : i))
            .filter((i) => i.count > 0),
        })),

      clear: () => set({ items: [] }),
    }),
    { name: "cart" }
  )
);

/* مجموع تعداد اقلام — برای نشان روی آیکون سبد */
export const selectTotalCount = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.count, 0);

/* مبلغ کل به تومان */
export const selectTotalPrice = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.price * item.count, 0);