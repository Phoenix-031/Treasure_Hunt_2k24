import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/app/api/_config/connectDb';
import QuestionModel from '../_model/question.model';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const result= await QuestionModel.find({})

    // const payload = req.headers.get('Set-user');
    // if (!payload) {
    //   return NextResponse.json({
    //     message: 'Unauthorized',
    //   });
    // }
    // const user = JSON.parse(payload);
    return NextResponse.json({
      message: 'Welcome to instructions',
      result : result
    });
  } catch (error) {
    return NextResponse.json({
      message: 'An error occurred while processing your request.',
      description: JSON.stringify(error),
    });
  }
}