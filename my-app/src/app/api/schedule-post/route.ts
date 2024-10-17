import dbconnect from '@/lib/db/connect';
import TweetModel from '@/lib/db/model/tweet.model';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { TwitterApi } from 'twitter-api-v2';
import { authOptions } from '../auth/[...nextauth]/option';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    await dbconnect();
    const session = await getServerSession(authOptions);
    const userId = session?.userid; // Make sure this matches how you store the user ID
    console.log('User ID:', userId);
    const cookie=cookies()
    const googlecookie=cookie.get('mygoogleid') 
    const userid=googlecookie?.value
    const { content, title,category} = await req.json();
    const posteddate = new Date();
    // // const { content } = await req.json();
    const scheduledTweet = await TweetModel.create({
      title,
      posteddate,
      category,
      // scheduleDate: new Date(scheduleDate),
      content,
      userId:userid,
    });
    console.log('Scheduled tweet:', scheduledTweet);

    // Ensure the access token is available
    if (!session?.accessToken) {
      throw new Error('No access token available');
    }
    console.log('Access token:', session.accessToken);
    const twitterClient = new TwitterApi(session.accessToken);
    console.log('Twitter client created',twitterClient);

    // const tweetResponse = await twitterClient.v2.tweet(scheduledTweet.content);
    // twitterClient.v2.
    const tweetResponse = await twitterClient.v2.tweet(content);
    console.log('Tweet posted:', tweetResponse);

    // return NextResponse.json({ message: 'Tweet scheduled and posted successfully', scheduledTweet }, { status: 200 });
    return NextResponse.json({ message: 'Tweet scheduled and posted successfully', tweetResponse }, { status: 200 });
  } catch (error) {
    console.error('Error scheduling/posting tweet:', error);
    return NextResponse.json({ message: 'Error scheduling/posting tweet', error: error }, { status: 500 });
  }
}