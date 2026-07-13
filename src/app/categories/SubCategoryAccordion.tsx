'use client'

import { SubCategory } from "@/types/categories"
import {
  Accordion,
} from "@/components/ui/accordion";
import SubCategoryAccordionItem from "./SubCategoryAccordionItem";

interface CategoryAccordionProps {
    categories:SubCategory[];
}

export default function SubCategoryAccordion({ categories } : CategoryAccordionProps) {
  return (
    <Accordion type="multiple" className="w-full">
        {categories.map((category) => (
            <SubCategoryAccordionItem key={category.id} category={category}/>
        ))}
    </Accordion>
  )
}
