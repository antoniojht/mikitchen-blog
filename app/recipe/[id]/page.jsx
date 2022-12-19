import Image from "next/image";
import { Client } from "@notionhq/client";

export default async function Recipe({ params }) {
  const { id } = params;

  const blockPage = await getRecipe(id);

  const pageInfo = await getPageInfo(id);

  const getDisplayPage = () => {
    const jsx = [];
    let counterNumberedList = 1;

    blockPage.map((block) => {
      if (block.type === "heading_2") {
        jsx.push(<h2>{block.heading_2.rich_text[0]?.text.content}</h2>);
      }

      if (block.type === "bulleted_list_item") {
        jsx.push(
          <ul>
            <li>{block.bulleted_list_item.rich_text[0]?.text.content}</li>
          </ul>
        );
      }

      if (block.type === "numbered_list_item") {
        jsx.push(
          <ol start={counterNumberedList++}>
            <li>{block.numbered_list_item.rich_text[0]?.text.content}</li>
          </ol>
        );
      }

      if (block.type === "image") {
        jsx.push(
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src={`${block.image.file.url}`}
              alt={`Image for step}`}
              fill={true}
              style={{ objectFit: "cover" }}
            />
          </div>
        );
      }
    });

    return jsx;
  };

  return (
    <>
      <h1>{pageInfo.properties.Name.title[0]?.text.content}</h1>
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
      <p>Autor: {pageInfo.properties.Person.people[0].name}</p>
      {pageInfo.properties.Select.multi_select.map((tag) => (
        <div key={tag.name}>#{tag.name}</div>
      ))}
      <p>Dificultad: {pageInfo.properties.Dificultad.select.name}</p>
      <p>Tiempo coccion: {pageInfo.properties.Tiempo_coccion.number} min</p>
      <p>
        Tiempo elaboración: {pageInfo.properties.Tiempo_elaboracion.number} min
      </p>
      <p>
        Tiempo total:{" "}
        {pageInfo.properties.Tiempo_elaboracion.number +
          pageInfo.properties.Tiempo_coccion.number}{" "}
        min
      </p>
      {getDisplayPage()}
    </>
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
    id: recipe.id
  }));
}
