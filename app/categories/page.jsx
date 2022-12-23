import Link from "next/link";
import { Client } from "@notionhq/client";

export default async function Categories() {
  const categories = await getCategories();

  return (
    <>
      <h1 className="text-3xl font-bold">Categorias</h1>
      {categories.map((category) => {
        return (
          <Link
            className="inline pr-5 text-center"
            href={`categories/${category}`}
            key={category}
          >
            {category}
          </Link>
        );
      })}
    </>
  );
}

export async function getCategories() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const databaseId = "0902a65f0e1d4c3891d1db544993f4c4";

  const response = await notion.databases.query({
    database_id: databaseId,
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
  const joinSelect = multiSelect
    .reduce((prev, curr) => prev.concat(curr))
    .map((tag) => tag.name);

  return joinSelect;
}
