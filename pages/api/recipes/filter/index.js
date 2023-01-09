import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const filters = {
    and: [
      {
        property: "Tags",
        status: {
          equals: "Done",
        },
      },
    ],
  };

  const databaseId = "0902a65f0e1d4c3891d1db544993f4c4";
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: req.body === "" ? filters : JSON.parse(req.body),
  });

  res.status(200).json(response.results);
}
