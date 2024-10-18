import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import axios from 'axios';
import UserModel from '@/lib/db/model/user.model';
import { cookies } from 'next/headers';
import GeneratedModel from '@/lib/db/model/generatedcontent.model';
import dbconnect from '@/lib/db/connect';

export async function POST(req: Request) {
  await dbconnect()
  const {title,platform,category}= await req.json();
  const cookie=cookies()
  const googlecookie=cookie.get('mygoogleid')
  const userid=googlecookie?.value
  console.log("category",category)  
  console.log("platform",platform)
  let wordlimit=100
  let tokens=70
  if(platform==='twitter'){
    wordlimit=60
    tokens=70
  }else if(platform==='linkedin'){
    wordlimit=300
    tokens=400
  }else if(platform==='hashnode'){
    wordlimit=320
    tokens=400
  }
  const res = await generateText({
    model: openai('gpt-4'),
    system: `You are a content creation tool made for generating content on topics given by user for ${platform} in the category ${category} and the word limit should be according to the limit as per ${platform} post which is ${wordlimit} words so explain the thing in this limit only because this content will be posted.`,
    prompt: `write a blog or article on ${title}`,
    maxTokens:tokens
  });
  // const res = await generateText({
  //   model: openai('gpt-4'),
  //   system: `You are a content creation tool made for generating content on topics given by user for ${platform}`,
  //   prompt: `write a blog or article on ${title}`,
  //   maxTokens:tokens
  // });
  console.log(res.text);
  if(res.text.length>0){
    await UserModel.updateOne({userId: userid}, { $inc: { credits: -1 } });
    await GeneratedModel.create({
      userId: userid,
      title: title,
      category: category,
      platform: platform,
      content: res.text,
    })

   }
  const modifiedres=res.text.replaceAll("*", '');
  console.log(modifiedres);
  return Response.json(res);
}