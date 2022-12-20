import Image from "next/image";
import { Client } from "@notionhq/client";
import styles from "./page.module.css";
import { Avatar } from "../../components/Avatar";
import getUserInfo from "../../constants/userInfo";
import {
  getDisplayIngredients,
  getDisplaySteps,
} from "../../utils/generateRecipe";

export default async function Recipe({ params }) {
  const { id } = params;

  const block = getRecipe(id);
  const page = getPageInfo(id);

  const [blockPage, pageInfo] = await Promise.all([block, page]);

  return (
    <div className={styles.grid}>
      <div className={styles.gridTitle}>
        <h1>{pageInfo.properties.Name.title[0]?.text.content}</h1>
        <div style={{ position: "relative", width: "90%", height: "90%" }}>
          <Image
            src={`${pageInfo.cover.file.url}`}
            alt={`Image cover}`}
            fill={true}
            style={{ objectFit: "cover" }}
            sizes="min-width: 66em) 33vw,
            (min-width: 44em) 50vw,
            100vw"
            priority={true}
          />
        </div>
      </div>
      <div className={styles.gridAuthor}>
        <p>Sobre mi: </p>
        <Avatar url={pageInfo.properties.Person.people[0].avatar_url} />
        <p>Autor: {pageInfo.properties.Person.people[0].name}</p>
        <p>{getUserInfo()}</p>
        <hr />
        <div>
          Categoria/s:
          {pageInfo.properties.Select.multi_select.map((tag) => (
            <div key={tag.name}>#{tag.name}</div>
          ))}
        </div>
        <p>Dificultad: {pageInfo.properties.Dificultad.select.name}</p>
        <p>Tiempo coccion: {pageInfo.properties.Tiempo_coccion.number} min</p>
        <p>
          Tiempo elaboración: {pageInfo.properties.Tiempo_elaboracion.number}{" "}
          min
        </p>
        <p>
          Tiempo total:{" "}
          {pageInfo.properties.Tiempo_elaboracion.number +
            pageInfo.properties.Tiempo_coccion.number}{" "}
          min
        </p>
      </div>
      {getDisplaySteps(blockPage)}
      {getDisplayIngredients(blockPage)}
    </div>
  );
}

export async function getRecipe(id) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const response = await notion.blocks.children.list({
    block_id: id,
  });

  return response.results;
}

export async function getPageInfo(id) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const response = await notion.pages.retrieve({ page_id: id });

  return response;
}

export async function generateStaticParams() {
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

  return response.results.map((recipe) => ({
    id: recipe.id,
  }));
}
