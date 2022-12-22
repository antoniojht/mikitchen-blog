import Link from "next/link";
import { Client } from "@notionhq/client";
import styles from "./page.module.css";
import { Card } from "../components/Card";

export default async function Home() {
  const resRecipes = getRecipes();
  const resCategories = getCategories();

  const [recipes, categories] = await Promise.all([resRecipes, resCategories]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Bienvenido a miKitchen!</h1>
      <main>
        <h2 className="text-2xl font bold">Ultimas recetas</h2>
        <div className={styles.grid}>
          {recipes.map((recipe) => {
            return (
              <Card
                key={recipe.id}
                title={`${recipe.properties.Name.title[0].text.content}`}
                src={`${recipe.cover.file.url}`}
                slug={`/recipes/${recipe.id}`}
              />
            );
          })}
        </div>
        <div>
          <h2 className="text-2xl font bold">Categorías mas vistas</h2>
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
        </div>
      </main>
    </div>
  );
}

export async function getRecipes() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const databaseId = "0902a65f0e1d4c3891d1db544993f4c4";
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Tags",
      status: {
        equals: "Done",
      },
    },
    page_size: 5,
  });

  return response.results;
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
    page_size: 6,
  });

  const multiSelect = response.results.map(
    (page) => page.properties.Select.multi_select
  );
  const joinSelect = multiSelect
    .reduce((prev, curr) => prev.concat(curr))
    .map((tag) => tag.name);

  return joinSelect;
}
