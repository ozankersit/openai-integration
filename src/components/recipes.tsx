'use client';

import { useState, useTransition } from 'react';
import { fetchRecipes } from '@/app/fetch-recipes/action';

export default function Recipes() {
  const [ingredients, setIngredients] = useState<string>('');
  const [recipes, setRecipes] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Formun default davranışını engelleyin.
    startTransition(async () => {
      const response = await fetchRecipes(ingredients);
      if (response.success) {
        setRecipes(response.message); // Başarılı durumda tarifleri ayarla.
      } else {
        setRecipes(response.message); // Hata mesajını göster.
      }
    });
  };

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
        {isPending ? 'Fetching...' : 'Get Recipes'}
      </button>
      {recipes && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Recipes:</h2>
          <p className="whitespace-pre-wrap mt-2">{recipes}</p>
        </div>
      )}
    </form>
  );
}
