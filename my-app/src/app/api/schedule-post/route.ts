// In app/api/schedule-tweet/route.ts
import { scheduleTweet } from '@/lib/twitterScheduler';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { content, scheduledTime } = await request.json();
  const { id, username } = await scheduleTweet(content, new Date(scheduledTime));
  return NextResponse.json({ id, username });
}