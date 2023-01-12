import Image from "next/image";
import Link from 'next/link';
import { Client } from "@notionhq/client";
import styles from "./page.module.css";
import getUserInfo from "../../../utils/constants/userInfo";
import {
  getDisplayIngredients,
  getDisplaySteps,
} from "../../../utils/generateRecipe";
import Author from "../../../components/Author";
import { Pill } from "../../../components/Pills";

export default async function Recipe({ params }) {
  const { id } = params;

  const block = getRecipe(id);
  const page = getPageInfo(id);

  const [blockPage, pageInfo] = await Promise.all([block, page]);

  return (
    <div className={styles.grid}>
      <div className={styles.gridTitle}>
        <h1 className="text-4xl font-bold mb-3">
          {pageInfo.properties.Name.title[0]?.text.content}
        </h1>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
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
        <div className="flex gap-3 my-4 justify-between">
          <div className="flex gap-4">
            <Pill name={pageInfo.properties.Dificultad.select.name} />
            <div className="flex gap-2">
              <Image
                src="/assets/kitchen-pack-oven-svgrepo-com.svg"
                alt="svg time"
                width={16}
                height={16}
              />
              Cocción: {pageInfo.properties.Tiempo_coccion.number}&quot;
            </div>
            <div className="flex gap-2">
              <Image
                src="/assets/kitchen-pack-svgrepo-com.svg"
                alt="svg time"
                width={16}
                height={16}
              />
              Elaboración: {pageInfo.properties.Tiempo_elaboracion.number}&quot;
            </div>
          </div>
          <div>
            {pageInfo.properties.Select.multi_select.map((tag) => (
              <Link href={`/categories/${tag.name}`} key={tag.id}>
                <p
                  className={`text-slate-500 px-3 py-1 w-fit inline`}
                  key={tag.name}
                >
                  #{tag.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <hr />
      </div>
      <div className={`${styles.gridAuthor} mt-[35.2]`}>
        <Author
          avatar={pageInfo.properties.Person.people[0].avatar_url}
          name={pageInfo.properties.Person.people[0].name}
          bio={getUserInfo()}
        />
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
