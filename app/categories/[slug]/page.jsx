import { Client } from "@notionhq/client";
import { MostlyVisitedRecipes } from "../../../components/MostlyVisitedRecipes";

export default async function Recipes({ params }) {
  const recipes = await getRecipesByCategory(params.slug);

  return (
    <>
      <h1 className="text-3xl font-bold">Recetas de {params.slug}</h1>
      <MostlyVisitedRecipes recipes={recipes} />
    </>
  );
}

export async function generateStaticParams() {
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
    .map((tag) => ({ slug: tag.name }));

  return joinSelect;
}

export async function getRecipesByCategory(category) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const databaseId = "0902a65f0e1d4c3891d1db544993f4c4";
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Tags",
          status: {
            equals: "Done",
          },
        },
        {
          property: "Select",
          multi_select: {
            contains: category,
          },
        },
      ],
    },
  });

  return response.results;
}
