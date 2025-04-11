import { NextResponse } from "next/server";
import { OpenAI } from "openai";

export async function POST(request: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  try {
    const body = await request.json();
    const { ingredients } = body;

    const prompt = `I have the following ingredients: ${ingredients.join(
      ", "
    )}. What recipes can I make with these? Provide a short list with simple instructions.Please provide a list of recipes as a JSON array.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful recipe assistant." },
        { role: "user", content: prompt },
      ],
      response_format: {
        type: "json_object",
      },
      temperature: 0.7,
      max_tokens: 2000,
    });

    const recipes = response.choices[0]?.message?.content;
    if (!recipes) {
      return NextResponse.json(
        { error: "No recipes were generate." },
        { status: 500 }
      );
    }
    const result = JSON.parse(recipes);
    return NextResponse.json({ recipes:result }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}
