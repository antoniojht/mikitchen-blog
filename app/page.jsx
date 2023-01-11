import Link from "next/link";
import styles from "./page.module.css";
import { Card } from "../components/Card";
import { Client } from "@notionhq/client";
import { DATABASE_ID } from "../utils/constants/request";
import { CategoryCard } from "./categories/components/CategoryCard";

export default async function Home() {
  const resRecipes = getRecipes();
  const resCategories = getCategories();

  const [recipes, categories] = await Promise.all([resRecipes, resCategories]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Bienvenido a miKitchen!</h1>

      <article>
        <h2 className="text-2xl font-bold mb-4">Ultimas recetas</h2>
        <div className={styles.grid}>
          {recipes.map((recipe) => {
            return (
              <Card
                key={recipe.id}
                title={`${recipe.properties.Name.title[0].text.content}`}
                src={`${recipe.cover.file.url}`}
                slug={`/recipes/${recipe.id}`}
                dificulty={`${recipe.properties.Dificultad.select.name}`}
                total_time={`${recipe.properties.Tiempo_total.number}`}
              />
            );
          })}
        </div>
      </article>
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
    </div>
  );
}

export async function getRecipes() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      property: "Tags",
      status: {
        equals: "Done",
      },
    },
    page_size: 6,
  });

  return response.results;
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
    page_size: 6,
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

  return uniqueTags.slice(0, 6);
}
