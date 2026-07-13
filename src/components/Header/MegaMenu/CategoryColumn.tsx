import { SubCategory } from "@/types/categories"

import SubCategoryItem from "./SubCategoryItem"

interface SubCategoryColumnProps {
  items: SubCategory[]
}

export default function CategoryColumn({ items }: SubCategoryColumnProps) {
  return (
    <div className="w-58 shrink-0 space-y-3">
      {
        items.map((item) => (
          <SubCategoryItem
            key={item.id}
            item={item}
          />
        ))
      }

    </div>
  )
}
