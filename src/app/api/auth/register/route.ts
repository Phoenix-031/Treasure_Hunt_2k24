import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../_config/connectDb";
import TeamModel from "../../_model/team.model";
import { memberSchema, teamSchema } from "../../_validation/user.validation";
import { z } from "zod";


type TeamBodyType = z.infer<typeof teamSchema>


export async function POST(req: NextRequest) {
    const body :  TeamBodyType= await req.json();

    const { success, data } = teamSchema.safeParse(body);
    const memberParse = memberSchema.safeParse(body.teamMembers[0])

    if (!success) {
        return NextResponse.json({
            message: 'Invalid data',
        });
    }else if(!memberParse.success) {
        return  NextResponse.json({
            message :'Invaid member data provided'
        })
    }

    if (!success) {
        return NextResponse.json({
            message: 'Invalid data',
        });
    }else if(!memberParse.success) {
        return  NextResponse.json({
            message :'Invaid member data provided'
        })
    }

    try {
        await connectDB();
        const res = await TeamModel.create({
            teamName: data.teamName,
            teamId: data.teamId,
            numberOfLives: data.numberOfLives,
            progressString: data.progressString,
            validationString: data.validationString,
            currentQuestionStage: data.currentQuestionStage,
            isDisqualified: data.isDisqualified,
            teamMembers: data.teamMembers,
        });

        return NextResponse.json({
            message: 'Team created successfully',
            result: res,
        });
    } catch (error) {
        return NextResponse.json({
            message: 'An error occurred while processing your request.',
            description: JSON.stringify(error),
        });
    }
}