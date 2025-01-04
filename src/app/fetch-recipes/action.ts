"use server";

export async function fetchRecipes(ingredients: string) {
  const WEB_URL = process.env.NEXT_LOCAL_WEB_URL;
  try {
    const res = await fetch(`${WEB_URL}/api/recipes`, {
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
