'use client'

import { SubCategory } from "@/types/categories"
import {
  Accordion,
} from "@/components/ui/accordion";
import SubCategoryAccordionItem from "./SubCategoryAccordionItem";

interface SubCategoryAccordionProps {
    subCategories:SubCategory[];
}

export default function SubCategoryAccordion({ subCategories } : SubCategoryAccordionProps) {
  return (
    <Accordion type="multiple" className="w-full">
        {subCategories.map((subCategory) => (
            <SubCategoryAccordionItem key={subCategory.id} subCategory={subCategory}/>
        ))}
    </Accordion>
  )
}
