import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  const { category } = req.query;

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
