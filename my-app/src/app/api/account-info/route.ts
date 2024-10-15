
import dbconnect from '@/lib/db/connect';
import UserModel from '@/lib/db/model/user.model';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cookieStore = cookies();
    const cookieValue = cookieStore.get('mygoogleid');  // Get cookie value
    if(!cookieValue) {
      return NextResponse.json("not authenticated", { status: 401 });
    }
    await dbconnect();
    const founduser=await UserModel.findOne({ userId: cookieValue.value });
    return NextResponse.json(founduser);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}