import Link from "next/link";
import { CategoryCard } from "../app/categories/components/CategoryCard";

export function MostlyVisitedCategories({ categories }) {
  return (
    <article>
      <h2 className="text-2xl font-bold mt-4 mb-4">Categorías mas vistas</h2>
      <div className="flex justify-between flex-wrap">
        {categories.map((category) => {
          return (
            <Link href={`/categories/${category.name}`} key={category.id}>
              <CategoryCard name={category.name} color={category.color} />
            </Link>
          );
        })}
      </div>
    </article>
  );
}
