"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Combobox } from "@headlessui/react";

export default function Search() {
  const router = useRouter();
  const [results, setResults] = useState([]);

  const handleSelectRecipe = (result) => {
    if (result) {
      router.push(`/recipes/${result.id}`);
    }
  };

  const handleSearch = (event) => {
    fetch(`/api/recipes/text?q=${event.target.value}`)
      .then((res) => res.json())
      .then((resultsFromApi) => {
        setResults(resultsFromApi);
      });
  };

  return (
    <Combobox as="form" onChange={handleSelectRecipe} className="relative mb-0">
      <Combobox.Input
        placeholder="Buscar recetas..."
        type="search"
        className="bg-slate-200 rounded-md p-3"
        onChange={handleSearch}
      />

      {results.length > 0 && (
        <Combobox.Options className="absolute w-full overflow-hidden bg-white hover:bg-slate-200 border border-gray-300 rounded-t-none shadow-lg rounded-md list-none p-3 cursor-pointer">
          {results.map((recipe) => (
            <Combobox.Option key={recipe.id} value={recipe}>
              {recipe.properties.Name.title[0].text.content}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      )}
    </Combobox>
  );
}
