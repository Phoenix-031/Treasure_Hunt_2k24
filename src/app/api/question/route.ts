import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/app/api/_config/connectDb';
import QuestionModel from '../_model/question.model';
import { z } from 'zod';
import { QuestionSchema } from '../_validation/question.validation';
import { headers } from 'next/headers';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const result= await QuestionModel.find({})

    return NextResponse.json({
      message: 'Welcome to instructions',
      data : result,
      headers:{
        'ACCESS-CONTROL-ALLOW-ORIGIN': '*'
      }
    });
  } catch (error) {
    return NextResponse.json({
      message: 'An error occurred while processing your request.',
      description: JSON.stringify(error),
    });
  }
}

export async function POST(req: NextRequest) {

    const body = await req.json();

    const {success, data} = QuestionSchema.safeParse(body);

    if(!success) {
        return NextResponse.json({
            message :'Invalid data',
        })
    }
    
    try {
        await connectDB();
        const res = await  QuestionModel.create({
            question: data.question,
            questionImage: data.questionImage,
            questionId: data.questionId,
            spotName: data.spotName,
            answerCode: data.answerCode
        })
        
        return NextResponse.json({
            message: 'Question added successfully',
            data: res,
            headers:{
              'ACCESS-CONTROL-ALLOW-ORIGIN': '*'
            }
        })
        
    } catch (error) {
        return NextResponse.json({
        message: 'An error occurred while processing your request.',
        description: JSON.stringify(error),
        });
    }
}