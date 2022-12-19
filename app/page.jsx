import Image from "next/image";
import Link from "next/link";
import { Client } from "@notionhq/client";
import styles from "./page.module.css";

export default async function Home() {
  const recipes = await getRecipes();
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to MiKitchen!</h1>
      <main className={styles.main}>
        <p>Últimas recetas</p>
        <div className={styles.grid}>
          {recipes.map((recipe) => {
            return (
              <Link
                key={recipe.id}
                href={`/recipe/${recipe.id}`}
                className={styles.card}
              >
                <h2>{recipe.properties.Name.title[0].text.content}</h2>
                <Image
                  src={`${recipe.cover.file.url}`}
                  alt={`Cover image for recipe ${recipe.properties.Name.title[0].text.content}`}
                  width={220}
                  height={180}
                />
              </Link>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
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
  });

  return response.results;
}
