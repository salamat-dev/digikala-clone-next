import { getCategories } from "@/services/categories.service";
import Header from "./Header";
import BottomNavigation from "./mobileMenu/BottomNavigation";


export default async function HeaderData() {
  const categories = await getCategories();

  return (
    <>
        <Header categories={categories}/>
        <BottomNavigation categories={categories}/>
    </>
  )
}
