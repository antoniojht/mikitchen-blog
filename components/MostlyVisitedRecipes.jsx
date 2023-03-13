import styles from "../app/page.module.css";
import { Card } from "./Card";

export function MostlyVisitedRecipes({ recipes }) {
  return (
    <article>
      <h2 className="text-2xl font-bold mb-4">Ultimas recetas</h2>
      <div className={styles.grid}>
        {recipes.map((recipe) => {
          return (
            <Card
              key={recipe.id}
              title={`${recipe.properties.Name.title[0].text.content}`}
              src={`${recipe.cover.file.url}`}
              slug={`/recipes/${recipe.id}`}
              dificulty={`${recipe.properties.Dificultad.select.name}`}
              total_time={`${recipe.properties.Tiempo_total.number}`}
            />
          );
        })}
      </div>
    </article>
  );
}
