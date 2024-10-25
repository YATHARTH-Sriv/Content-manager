import dbconnect from '@/lib/db/connect';
import TweetModel from '@/lib/db/model/tweet.model';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { TwitterApi } from 'twitter-api-v2';
import { authOptions } from '../auth/[...nextauth]/option';

export async function POST(req: NextRequest) {
  await dbconnect();
  try {
    const { content, title,category} = await req.json();
    const session = await getServerSession(authOptions);
    console.log("session from server",session)
  if (!session?.accessToken) {
    console.error('Access token is missing in the session');
    throw new Error('No access token available');
  }
  const twitterClient = new TwitterApi(session.accessToken);
  console.log('Client created:', twitterClient);
  const tweetResponse = await twitterClient.v2.tweet(content);
  console.log('Tweet posted:', tweetResponse);
  const date= new Date()
  await TweetModel.create({
    title: title,
    category: category,
    content: content,
    userId: session.userid,
    posteddate:date
  });
  return NextResponse.json({ message: 'Tweet scheduled and posted successfully', tweetResponse }, { status: 200 });
  } catch (error) {
    console.error('Error scheduling/posting tweet:', error);
    return NextResponse.json({ message: 'Error scheduling/posting tweet', error: error }, { status: 500 });
  }
}
