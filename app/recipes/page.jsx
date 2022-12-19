import Image from 'next/image';
import { Client } from "@notionhq/client";

export default async function Recipes() {
  const recipes = await getRecipes();

  return (
    <>
      {recipes.map(recipe => {
        return (
          <>
            <h1>
              {recipe.properties.Name.title[0].text.content}
            </h1>
            <Image 
              src={`${recipe.cover.file.url}`}
              alt={`Cover image for recipe ${recipe.properties.Name.title[0].text.content}`}
              width={300}
              height={300}
            />
          </>
        )
      })}
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
        equals: "Done"
      }
    },
  });

  return response.results;
}
