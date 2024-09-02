import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import TeamModel from "../_model/team.model";

const RequestSchema = z.object({
    answer : z.string(),
})

export async function POST(req : NextRequest) {
    try {

        const body = await req.json();

        const verifyBody = RequestSchema.safeParse(body);

        if(!verifyBody.success) {
            return NextResponse.json({
                success : false,
                zodErrorBody : verifyBody.error ?verifyBody.error : null,
                message: 'Invalid request body',
                body: JSON.stringify(verifyBody),
            })
        }

        if(verifyBody.data?.answer.toLowerCase() !== 'secret') {
            return NextResponse.json({
                success : false,
                message: 'Access denied',
                body: JSON.stringify({ message: "Access denied" }),
            })
        }

        const {teamId} = body;

        const team = await TeamModel.findOne({
            teamId
        });

        if(!team) {
            return NextResponse.json({
                success : false,
                message: 'Team not found',
                body: JSON.stringify({ message: "Team not found" }),
            })
        }

        const newTeam = await TeamModel.findOneAndUpdate({
            teamId
        },{
            $set : {
                progressString: 'initialsol_',
                currentQuestionStage : 1
            },
        },{
            new: true
        })

        return NextResponse.json({
            success : true,
            message: 'Access granted',
            body: newTeam,
        })
    } catch (error) {
        return NextResponse.json({
            message: 'An error occurred while processing your request.',
            body: JSON.stringify({ message: "Internal Server Error" }),
        })
    }
}