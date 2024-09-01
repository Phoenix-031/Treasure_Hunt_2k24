import { NextResponse, NextRequest } from "next/server";
import connectDB from "../_config/connectDb"
import { z } from "zod";
import TeamModel from "../_model/team.model";
import QuestionModel from "../_model/question.model";

const VerifySchema = z.object({
    teamId : z.string(),
    questionId : z.string(),
    answerCode : z.string(),
})

export async function POST(req : NextRequest) {
    try {
        await connectDB();

        const body= await req.json();

        const verifyBody = VerifySchema.safeParse(body);

        if(!verifyBody.success) {
            return NextResponse.json({
                status: 400,
                success : false,
                message: 'Invalid request body',
                body: JSON.stringify(verifyBody.error),
            })
        }

        const { teamId, questionId, answerCode } = verifyBody.data;

        const team = await TeamModel.findOne({
            teamId: teamId,
        })

        if(!team) {
            return NextResponse.json({
                status: 404,
                success : false,
                message: 'Team not found',
                body: JSON.stringify({ message: "Team not found" }),
            })
        }

        if(team.isDisqualified || team.numberOfLives === 0) {
            return NextResponse.json({
                status: 403,
                success : false,
                message: 'Team is disqualified',
                body: JSON.stringify({ message: "Team is disqualified" }),
            })
        }

        const question = await QuestionModel.findOne({
            questionId: questionId,
        })

        if(!question) {
            return NextResponse.json({
                status: 404,
                success : false,
                message: 'Question not found',
                body: JSON.stringify({ message: "Question not found" }),
            })
        }

        if(question.answerCode !== answerCode) {
            await TeamModel.updateOne({
                teamId: teamId,
            }, {
                $set: {
                    numberOfLives: team.numberOfLives - 1,
                }
            })

            return NextResponse.json({
                status: 400,
                success : false,
                message: 'Incorrect answer code',
                body: JSON.stringify({ message: "Incorrect answer code" }),
            })
        }

        await TeamModel.updateOne({
            teamId: teamId,
        }, {
            $set: {
                progressString: team.progressString + answerCode,
            }
        })

        return NextResponse.json({
            status: 200,
            success : true,
            message: 'Answer code verified',
            body: JSON.stringify({ message: "Answer code verified" }),
        })

    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: 'An error occurred while processing your request.',
            body: JSON.stringify({ message: "Internal Server Error" }),
        })
    }
}