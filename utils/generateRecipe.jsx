import Image from "next/image";

export const getIngredients = (blockPage) => {
  const ingredients = [];

  blockPage.map((block) => {
    if (block.type === "bulleted_list_item") {
      const ingredientQuantity =
        block.bulleted_list_item.rich_text[0]?.text.content;

      const ingredient = {
        name: ingredient.split(" ").slice(0, -1).join(" "),
        quantity: ingredient.split(" ").at(-1),
      };

      ingredients.push(ingredient);
    }
  });

  return ingredients;
};

export const getDisplayIngredients = (blockPage) => {
  const jsx = [];

  blockPage.map((block) => {
    if (
      block.type === "heading_2" &&
      block.heading_2.rich_text[0]?.text.content !== "Preparación"
    ) {
      jsx.push(
        <h2 className="text-2xl font-bold">
          {block.heading_2.rich_text[0]?.text.content}
        </h2>
      );
    }

    if (block.type === "bulleted_list_item") {
      jsx.push(
        <ul>
          <li>{block.bulleted_list_item.rich_text[0]?.text.content}</li>
        </ul>
      );
    }
  });

  return <div style={{ marginTop: "4rem" }}>{jsx}</div>;
};

export const getDisplaySteps = (blockPage) => {
  const jsx = [];
  let counterNumberedList = 1;

  blockPage.map((block) => {
    if (
      block.type === "heading_2" &&
      block.heading_2.rich_text[0]?.text.content === "Preparación"
    ) {
      jsx.push(
        <h2 className="text-2xl font-bold">
          {block.heading_2.rich_text[0]?.text.content}
        </h2>
      );
    }

    if (block.type === "numbered_list_item") {
      jsx.push(
        <ol start={counterNumberedList++} className="mb-3">
          <li>{block.numbered_list_item.rich_text[0]?.text.content}</li>
        </ol>
      );
    }

    if (block.type === "image") {
      jsx.push(
        <div
          style={{
            position: "relative",
            width: "80%",
            height: "100%",
            marginLeft: "2.625rem",
          }}
        >
          <Image
            src={`${block.image.file.url}`}
            alt={`Image for step}`}
            fill={true}
            style={{ objectFit: "cover" }}
            sizes="min-width: 66em) 33vw,
          (min-width: 44em) 50vw,
          100vw"
          />
        </div>
      );
    }
  });

  return (
    <div
      style={{
        gridColumn: "1/3",
        marginTop: "4rem",
      }}
    >
      {jsx}
    </div>
  );
};
