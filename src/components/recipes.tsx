"use client";

type RecipesModel = {
  name: string;
  instructions: string[];
};

import { useState, useTransition } from "react";
import { fetchRecipes } from "@/app/fetch-recipes/action";

export default function Recipes() {
  const [ingredients, setIngredients] = useState<string>("");
  const [recipes, setRecipes] = useState<RecipesModel[] | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const response = await fetchRecipes(ingredients);
      if (response.success) {
        setRecipes(response.message.recipes);
      } else {
        setRecipes(response.message);
      }
    });
  };

  console.log("ozan", recipes);
  return (
    <form className="p-6" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold">Recipe Suggestions</h1>
      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients separated by commas"
        rows={4}
        className="w-full p-2 border rounded-md mt-4"
        required
      />
      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 disabled:opacity-50"
      >
        {isPending ? "Fetching..." : "Get Recipes"}
      </button>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mt-4">
        {recipes ?
        recipes.map((recipe, index) => (
          <div key={index} className="border rounded-md p-2">
            <div className="font-bold">{recipe.name}</div>
            <div className="font-bold list-decimal">
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </div>
          </div>
        )) : null}
      </div>
      
    </form>
  );
}
