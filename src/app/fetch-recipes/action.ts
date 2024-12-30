"use server";

export async function fetchRecipes(ingredients: string) {
  const res = await fetch("http://localhost:3000/api/recipes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ingredients: ingredients.split(",").map((i) => i.trim()),
    }),
  });
  if (res.status === 404) {
    return { message: "An error occurred" };
  }
  if (res.status === 200) {
    return { succes: true, message: "Success" };
  }
  if (res.status === 102) {
    return { pending: true, message: "Pending" };
  }
}
