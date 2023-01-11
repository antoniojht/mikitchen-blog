import { Client } from "@notionhq/client";
import { DATABASE_ID } from '../../../../utils/constants/request';

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

  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: req.body === "" ? filters : JSON.parse(req.body),
    page_size: 12,
  });

  res.status(200).json(response);
}
