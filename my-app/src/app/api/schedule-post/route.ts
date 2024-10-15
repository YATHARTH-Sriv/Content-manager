import dbconnect from '@/lib/db/connect';
import TweetModel from '@/lib/db/model/tweet.model';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { TwitterApi } from 'twitter-api-v2';
import { authOptions } from '../auth/[...nextauth]/option';

export async function POST(req: NextRequest) {
  try {
    await dbconnect();
    const session = await getServerSession(authOptions);
    const userId = session?.userid; // Make sure this matches how you store the user ID
    console.log('User ID:', userId);

    const { content, scheduleDate} = await req.json();
    // const { content } = await req.json();
    console.log(scheduleDate)
    const scheduledTweet = await TweetModel.create({
      content,
      // scheduleDate: new Date(scheduleDate),
      userId,
    });
    console.log('Scheduled tweet:', scheduledTweet);

    // Ensure the access token is available
    if (!session?.accessToken) {
      throw new Error('No access token available');
    }

    const twitterClient = new TwitterApi(session.accessToken);
    console.log('Twitter client created');

    const tweetResponse = await twitterClient.v2.tweet(scheduledTweet.content);
    console.log('Tweet posted:', tweetResponse);

    return NextResponse.json({ message: 'Tweet scheduled and posted successfully', scheduledTweet }, { status: 200 });
  } catch (error) {
    console.error('Error scheduling/posting tweet:', error);
    return NextResponse.json({ message: 'Error scheduling/posting tweet', error: error }, { status: 500 });
  }
}