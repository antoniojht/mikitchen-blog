import { Client } from "@notionhq/client";
import { ALL } from "../../../../utils/constants/request";

export default async function handler(req, res) {
  const { limit } = req.query;

  let page_size = 100;

  if (limit !== ALL) {
    page_size = Number(limit);
  }

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
    page_size,
  });

  return res.status(200).json(response.results);
}
