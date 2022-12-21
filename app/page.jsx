import Image from "next/image";
import Link from "next/link";
import { Client } from "@notionhq/client";
import styles from "./page.module.css";

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
              <Link
                key={recipe.id}
                href={`/recipe/${recipe.id}`}
                className={styles.card}
              >
                <h2>{recipe.properties.Name.title[0].text.content}</h2>
                <Image
                  src={`${recipe.cover.file.url}`}
                  alt={`Cover image for recipe ${recipe.properties.Name.title[0].text.content}`}
                  width={220}
                  height={180}
                />
              </Link>
            );
          })}
        </div>
        <div>
          <h2 className="text-2xl font bold">Categorias</h2>
          {categories.map((category) => {
            return (
              <div className="inline pr-5 text-center" p key={category}>
                {category}
              </div>
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
  });

  const multiSelect = response.results.map(
    (page) => page.properties.Select.multi_select
  );
  const joinSelect = multiSelect
    .reduce((prev, curr) => prev.concat(curr))
    .map((tag) => tag.name);

  return joinSelect;
}
