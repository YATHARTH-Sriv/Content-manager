// In app/api/account-info/route.ts
import { getAccountInfo } from '@/lib/twitterScheduler';
import { NextResponse } from 'next/server';

export async function GET() {
  const info = await getAccountInfo();
  return NextResponse.json(info);
}