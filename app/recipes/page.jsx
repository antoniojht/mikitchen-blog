import { Card } from "../../components/Card";
import styles from './page.module.css';
import { Client } from "@notionhq/client";

export default async function Recipes() {
  const recipes = await getRecipes();
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Recetas</h1>
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
    </>
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
