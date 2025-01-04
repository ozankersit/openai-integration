"use server";

export async function fetchRecipes(ingredients: string) {
  try {
    const res = await fetch("http://localhost:3000/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredients: ingredients.split(",").map((i) => i.trim()),
      }),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    return { success: true, message: data.recipes };
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return { success: false, message: "Failed to fetch recipes." };
  }
}
