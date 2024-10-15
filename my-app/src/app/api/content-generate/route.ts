import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const {title,type}= await req.json();
  const res = await generateText({
    model: openai('gpt-4'),
    system: 'You are a content creation tool made for generating content on topics given by user and the charachter limit should be according to the limit as per twitter post which is 280 charachters so explain the thing in this limit only because this content will be posted.',
    prompt: `write a blog on ${title}`,
    maxTokens:70
  });
  console.log(res.text);
  console.log(type)
  return Response.json(res);
}