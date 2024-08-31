import { NextResponse, NextRequest } from "next/server";
import connectDB from "../../_config/connectDb";
import TeamModel from "../../_model/team.model";

export async function GET(req : NextRequest, {params} : {params : {teamId : string}}) {
    try {
        await connectDB();
        const teamId = params.teamId;
        console.log(params,"team id")

        const res = await TeamModel.findOne({
            teamId: teamId,
        })

        return NextResponse.json({
            message: 'Team retrieved successfully',
            data: res,
        })
        
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: 'An error occurred while processing your request.',
            body: JSON.stringify({ message: "Internal Server Error" }),
        })
    }
}

interface TeamUpdateRequest {
    teamName?: string;
    numberOfLives?: number;
    progressString?: string;
    validationString?: string;
    currentQuestionStage?: number;
    isDisqualified?: boolean;
    teamMembers?: {
        name: string;
        espektroId: string;
    }[];
}

export async function PUT(req: NextRequest, { params }: { params: { teamId: string } }) {
    try {
        await connectDB();

        const teamId = params.teamId;
        const body = await req.json();

        console.log(body, "ths is body")
        
        const updateFields: Partial<TeamUpdateRequest> = {};
        if (body.teamName) updateFields['teamName'] = body.teamName;
        if (body.numberOfLives !== undefined) updateFields['numberOfLives'] = body.numberOfLives;
        if (body.progressString) updateFields['progressString'] = body.progressString;
        if (body.validationString) updateFields['validationString'] = body.validationString;
        if (body.currentQuestionStage !== undefined) updateFields['currentQuestionStage'] = body.currentQuestionStage;
        if (body.isDisqualified !== undefined) updateFields['isDisqualified'] = body.isDisqualified;
        if (body.teamMembers) updateFields['teamMembers'] = body.teamMembers;

        const updatedTeam = await TeamModel.findOneAndUpdate(
            { teamId: teamId },
            { $set: updateFields },
            { new: true , returnOriginal:false}
        );

        if (!updatedTeam) {
            return NextResponse.json({
                status: 404,
                message: 'Team not found.',
            });
        }

        return NextResponse.json({
            message: 'Team updated successfully',
            data: updatedTeam,
        });
        
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: 'An error occurred while processing your request.',
            body: JSON.stringify({ message: "Internal Server Error" }),
        });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { teamId: string } }) {
    try {
        await connectDB();
        const deleteTeam = await TeamModel.deleteOne({
            teamId : params.teamId,
        });
        return NextResponse.json({
            message: 'Team deleted successfully',
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: 'An error occurred while processing your request.',
            body: JSON.stringify({ message: "Internal Server Error" }),
        });
    }
}