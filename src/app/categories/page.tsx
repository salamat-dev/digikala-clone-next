import { getCategories } from "@/services/categories.service"
import CategoriesClient from "./CategoriesClient";

export default async function CategoriesPage() {
    const categories = await getCategories();
    console.log(categories)
  return (
    <CategoriesClient categories={categories}/>
  )
}
