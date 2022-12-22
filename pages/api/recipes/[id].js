import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const response = await notion.blocks.children.list({
    block_id: id,
  });

  return res.status(200).json(response.results);
}
