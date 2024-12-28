import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const body = await request.json();
  const { ingredients } = body;

  if (!ingredients || !Array.isArray(ingredients)) {
    return NextResponse.json({ error: 'Invalid ingredients format' }, { status: 400 });
  }

  try {
    const prompt = `I have the following ingredients: ${ingredients.join(', ')}. What recipes can I make with these? Provide a short list with simple instructions.`;
    
    const response = await openai.chat.completions.create({
      model: 'babbage-002',
      messages: [
        { role: 'system', content: 'You are a helpful recipe assistant.' },
        { role: 'user', content: prompt },
      ],
    });

    const recipes = response.choices[0]?.message?.content;
    return NextResponse.json({ recipes }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
  }
}
