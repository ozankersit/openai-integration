'use client';

import { useState } from 'react';

export default function Recipes() {
  const [ingredients, setIngredients] = useState<string>('');
  const [recipes, setRecipes] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async () => { //server action tarafına taşınıcak
    setLoading(true);
    setRecipes(null);
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: ingredients.split(',').map((i) => i.trim()) }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await response.json();
      setRecipes(data.recipes);
    } catch (error) {
      console.error(error);
      setRecipes('Error fetching recipes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Recipe Suggestions</h1>
      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients separated by commas"
        rows={4}
        className="w-full p-2 border rounded-md mt-4"
      />
      <button
        onClick={fetchRecipes}
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
    </div>
  );
}
