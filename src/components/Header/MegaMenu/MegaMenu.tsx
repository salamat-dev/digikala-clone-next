import MegaMenuClient from "./MegaMenuClient";
import { Category } from "@/types/categories";

interface MegaMenuProps {
  categories: Category[];
}

export default function MegaMenu({
  categories,
}: MegaMenuProps) {
  return <MegaMenuClient categories={categories} />;
}