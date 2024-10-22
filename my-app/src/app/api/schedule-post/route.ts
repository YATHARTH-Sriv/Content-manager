import dbconnect from '@/lib/db/connect';
import TweetModel from '@/lib/db/model/tweet.model';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { TwitterApi } from 'twitter-api-v2';
import { authOptions } from '../auth/[...nextauth]/option';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  await dbconnect();
  try {
    // const { content, title,category} = await req.json();
    const { content, title,category} = await req.json();
    const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    console.error('Access token is missing in the session');
    throw new Error('No access token available');
  }
  
  console.log('Access token:', session.accessToken);
  const twitterClient = new TwitterApi(session.accessToken);
  
  // Add more logging to inspect the session scopes (optional)
  console.log('Session scopes:', session);
  
  // Test posting a tweet to check the response
  const tweetResponse = await twitterClient.v2.tweet(content);
  console.log('Tweet posted:', tweetResponse);
  return NextResponse.json({ message: 'Tweet scheduled and posted successfully', tweetResponse }, { status: 200 });
  } catch (error) {
    console.error('Error scheduling/posting tweet:', error);
    return NextResponse.json({ message: 'Error scheduling/posting tweet', error: error }, { status: 500 });
  }
}
