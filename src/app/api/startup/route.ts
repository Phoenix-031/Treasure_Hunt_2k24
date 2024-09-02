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

        if(!verifyBody) {
            return NextResponse.json({
                status: 400,
                success : false,
                message: 'Invalid request body',
                body: JSON.stringify(verifyBody),
            })
        }

        if(verifyBody.data?.answer.toLowerCase() !== 'secret') {
            return NextResponse.json({
                status: 403,
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
                status: 404,
                success : false,
                message: 'Team not found',
                body: JSON.stringify({ message: "Team not found" }),
            })
        }

        await team.updateOne({
            $set : {
                validationString: 'initialsol',
                currentQuestionStage : 1
            }
        })

        return NextResponse.json({
            status: 200,
            success : true,
            message: 'Access granted',
            body: JSON.stringify({ message: "Access granted" }),
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: 'An error occurred while processing your request.',
            body: JSON.stringify({ message: "Internal Server Error" }),
        })
    }
}