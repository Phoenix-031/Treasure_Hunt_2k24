import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../_config/connectDb";
import QuestionModel from "../../_model/question.model";
import { QuestionSchema } from "../../_validation/question.validation";

export async function GET(req : NextRequest,{params} : {params : {id : string}}) {

    try {
        await connectDB();
        const questionId = params.id;

        const result= await QuestionModel.find({
            questionId: questionId
        })

        return NextResponse.json({
            message: 'The question have been successfully retrieved',
            data : result
        });
    } catch (error) {
        return NextResponse.json({
        message: 'An error occurred while processing your request.',
        description: JSON.stringify(error),
        });
    }
}

export async function PUT(req : NextRequest, {params} : {params : {id : string}}) {
    try {
        await connectDB();
        const questionId = params.id;
        
        const body = await req.json();

        const {success, error} = await QuestionSchema.partial().safeParse(body);

        if(!success) {
            return NextResponse.json({
                message :'Invalid data',
            })
        }

        const res = await QuestionModel.findOneAndUpdate({
            questionId : questionId
        },{
            $set: body
        },{
            returnOriginal: false,
        })

        return NextResponse.json({
            message: 'Question updated successfully',
            data: res
        })
        
    } catch (error) {
        return NextResponse.json({
        message: 'An error occurred while processing your request.',
        description: JSON.stringify(error),
        });
    }
}

export async function DELETE(req : NextRequest, {params} : {params : {id : string}}) {
    try {
        await connectDB();
        const questionId = params.id;

        const res = await QuestionModel.findOneAndDelete({
            questionId : questionId
        })

        return NextResponse.json({
            message: 'Question deleted successfully',
            data: res
        })
        
    } catch (error) {
        return NextResponse.json({
        message: 'An error occurred while processing your request.',
        description: JSON.stringify(error),
        });
    }
}