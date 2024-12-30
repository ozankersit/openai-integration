'use client';

import { fetchRecipes } from '@/app/fetch-recipes/action';
import { useState } from 'react';
import { useFormState } from 'react-dom';

export default function Recipes() {
  const [ingredients, setIngredients] = useState<string>('');
  const [recipes, setRecipes] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [formState, formAction] = useFormState(
    async () => await fetchRecipes(ingredients),
    undefined
  );

  if (formState?.pending) {
    setLoading(true);
  } else {
    setLoading(false);
  }

  return (
    <form className="p-6" action={formAction}>
      <h1 className="text-2xl font-bold">Recipe Suggestions</h1>
      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients separated by commas"
        rows={4}
        className="w-full p-2 border rounded-md mt-4"
      />
      <button
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Fetching...' : 'Get Recipes'}
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
