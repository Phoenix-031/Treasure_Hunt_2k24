import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../_config/connectDb";
import TeamModel from "../../_model/team.model";
import { memberSchema, teamSchema } from "../../_validation/user.validation";
import { z } from "zod";


type TeamBodyType = z.infer<typeof teamSchema>


export async function POST(req: NextRequest) {
    const body :  TeamBodyType= await req.json();

    const teamVerified = teamSchema.safeParse(body);

    const membersVerified = body.teamMembers.every(member => memberSchema.safeParse(member).success);

    if (!membersVerified) {
        return NextResponse.json({
            status: 400,
            success: false,
            message: 'One or more team members have invalid data',
            body: JSON.stringify({ message: 'Invalid team members' }),
        });
    }

    if (!teamVerified.success) {
        return NextResponse.json({
            status: 400,
            success: false,
            message: 'Invalid team data provided',
            body: JSON.stringify({ message: 'Invalid team members' }),
        });
    }
    
    try {
        await connectDB();

        const teamData = teamVerified.data;

        const res = await TeamModel.create({
            teamName: teamData.teamName,
            teamId: teamData.teamId,
            numberOfLives: teamData.numberOfLives,
            progressString: teamData.progressString,
            validationString: teamData.validationString,
            currentQuestionStage: teamData.currentQuestionStage,
            isDisqualified: teamData.isDisqualified,
            teamMembers: teamData.teamMembers,
        });

        return NextResponse.json({
            message: 'Team created successfully',
            success : true,
            status:200,
            result: res,
        });
    } catch (error) {
        return NextResponse.json({
            success :false,
            status : 500,
            message: 'An error occurred while processing your request.',
            description: JSON.stringify(error),
        });
    }
}