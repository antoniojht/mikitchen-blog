import Image from "next/image";
import { Client } from "@notionhq/client";
import { DATABASE_ID } from "../utils/constants/request";
import { MostlyVisitedCategories } from "../components/MostlyVisitedCategories";
import { MostlyVisitedRecipes } from "../components/MostlyVisitedRecipes";

export default async function Home() {
  const resRecipes = getRecipes();
  const resCategories = getCategories();

  const [recipes, categories] = await Promise.all([resRecipes, resCategories]);

  const mainRecipe = { ...recipes[0] };

  return (
    <main>
      <h1 className="text-3xl font-bold">Bienvenido a miKitchen!</h1>
      <section>
        <article>
          <h2 className="text-2xl font-bold mb-4">
            Échale un vistazo a nuestra última receta
          </h2>
          <div>
            <div style={{ width: "50%", height: "50%", position: "relative" }}>
              <Image
                src={`${mainRecipe.cover.file.url}`}
                fill={true}
                className="object-cover"
                alt="Cover image showing latest recipe from blog"
              />
            </div>
            <div>
              <p>{`${mainRecipe.properties.Name.title[0].text.content}`}</p>
              <p>
                Dificultad: {`${mainRecipe.properties.Dificultad.select.name}`}
              </p>
              <p>Tiempo: {`${mainRecipe.properties.Tiempo_total.number}`}</p>
            </div>
          </div>
        </article>
        <MostlyVisitedRecipes recipes={recipes.slice(1)} />
        <MostlyVisitedCategories categories={categories} />
      </section>
    </main>
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
    sorts: [
      {
        property: "created_time",
        direction: "descending",
      },
    ],
    page_size: 7,
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
