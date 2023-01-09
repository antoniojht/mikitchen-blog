import { Card } from "../../components/Card";
import { Client } from "@notionhq/client";
import { Range } from "../../components/Range";
import { MyListbox } from "../../components/Listbox";

import { dificultad } from "../../utils/constants/dificultad";
import styles from "./page.module.css";

import { MyPopover } from "../../components/MyPopover";

export default async function Recipes() {
  // TODO - FILTROS: Tiempo total en minutos (Tiempo_coccion + Tiempo_elaboracion), etiqueta (Select), dificultad (Dificultad) ---> Eventos que modifiquen las recetas mostradas.
  // TODO - Paginacion.
  const recipes = await getRecipes();
  const categories = await getCategories();
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Recetas</h1>
      <MyPopover title={"Filtros"}>
        <div>
          Tiempo total <Range />
          <br />
          Categoria <MyListbox list={categories} />
          Dificultad <MyListbox list={dificultad} />
        </div>
      </MyPopover>

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

  return multiSelect[1];
}
