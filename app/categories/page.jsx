import Link from "next/link";
import { Client } from "@notionhq/client";
import { DATABASE_ID } from "../../utils/constants/request";
import { CategoryCard } from "./components/CategoryCard";

export default async function Categories() {
  const categories = await getCategories();
  console.log(categories);
  return (
    <>
      <h1 className="text-3xl font-bold">Categorias</h1>
      <div className="flex flex-wrap justify-start">
        {categories.map((category) => {
          return (
            <Link
              className="inline pr-5 text-center mb-4"
              href={`categories/${category.name}`}
              key={category.id}
            >
              <CategoryCard name={category.name} color={category.color} />
            </Link>
          );
        })}
      </div>
    </>
  );
}

export async function getCategories() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      property: "Select",
      multi_select: {
        is_not_empty: true,
      },
    },
  });

  const multiSelect = response.results.map(
    (page) => page.properties.Select.multi_select
  );

  const uniqueTags = multiSelect.flat().reduce((accumulator, current) => {
    if (!accumulator.find((item) => item.id === current.id)) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);

  return uniqueTags;
}
