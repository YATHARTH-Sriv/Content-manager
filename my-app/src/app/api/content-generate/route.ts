import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const {title,platform,category}= await req.json();
  let charachterlimit=100
  if(platform==='twitter'){
    charachterlimit=280
  }else if(platform==='linkedin'){
    charachterlimit=300
  }else if(platform==='hashnode'){
    charachterlimit=320
  }
  const res = await generateText({
    model: openai('gpt-4'),
    system: `You are a content creation tool made for generating content on topics given by user for ${platform} in the category ${category} and the charachter limit should be according to the limit as per ${platform} post which is ${charachterlimit} charachters so explain the thing in this limit only because this content will be posted.`,
    prompt: `write a blog on ${title}`,
    maxTokens:70
  });
  console.log(res.text);
  return Response.json(res);
}