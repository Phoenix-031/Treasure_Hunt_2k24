import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/app/api/_config/connectDb';
import QuestionModel from '../_model/question.model';
import { QuestionSchema } from '../_validation/question.validation';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const result= await QuestionModel.find({})

    return NextResponse.json({
      message: 'fetched all questions',
      success : true,
      data : result,
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
        })
        
    } catch (error) {
        return NextResponse.json({
        message: 'An error occurred while processing your request.',
        description: JSON.stringify(error),
        });
    }
}

export async function DELETE() {
  try {
    await connectDB();
    await QuestionModel.deleteMany({});
    return NextResponse.json({ message: 'All questions deleted successfully' });
  } catch (error) {
    return NextResponse.json({
      message: 'An error occurred while processing your request.',
      description: JSON.stringify(error),
    });
  }
}