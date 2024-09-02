import { NextResponse, NextRequest } from "next/server";
import connectDB from "../_config/connectDb"
import { z } from "zod";
import TeamModel from "../_model/team.model";
import QuestionModel from "../_model/question.model";

const VerifySchema = z.object({
    teamId : z.string({
        message: 'Team id must be a string'
    }),
    questionId : z.string().max(10,{
        message: 'Question id must be a string with maximum length of 10'
    }),
    answerCode : z.string().max(7, {
        message: 'Answer code must be a string with maximum length of 7'
    }),
})

export async function POST(req : NextRequest) {
    try {
        await connectDB();

        const body= await req.json();

        const verifyBody = VerifySchema.safeParse(body);

        if(!verifyBody.success) {
            return NextResponse.json({
                success : false,
                message: verifyBody.error,
                zodErrorBody : verifyBody.error ?verifyBody.error : null,
                body: JSON.stringify(verifyBody.error),
            })
        }

        const { teamId, questionId, answerCode } = verifyBody.data;

        const team = await TeamModel.findOne({
            teamId: teamId,
        })

        if(!team) {
            return NextResponse.json({
                success : false,
                message: 'Team not found',
                body: JSON.stringify({ message: "Team not found" }),
            })
        }

        if(team.isDisqualified || team.numberOfLives === 0) {
            return NextResponse.json({
                success : false,
                message: 'Team is disqualified',
                body: JSON.stringify({ message: "Team is disqualified" }),
            })
        }

        const question = await QuestionModel.findOne({
            questionId
        })

        if(!question) {
            return NextResponse.json({
                success : false,
                message: 'Question not found',
                body: JSON.stringify({ message: "Question not found" }),
            })
        }

        if(question.answerCode !== answerCode) {
            await TeamModel.updateOne(
                { teamId },
                { $inc: { numberOfLives: -1 } }
            );

            return NextResponse.json({
                success : false,
                message: 'Incorrect answer code',
                body: JSON.stringify({ message: "Incorrect answer code" }),
            })
        }

        const newTeam = await TeamModel.findOneAndUpdate({
            teamId,
        }, {
            $set: {
                progressString: team.progressString + answerCode +'_',
                currentQuestionStage: team.currentQuestionStage + 1,
            },
        },{
            new : true
        })

        return NextResponse.json({
            success : true,
            message: 'Answer code verified',
            body: newTeam,
        })

    } catch (error) {
        return NextResponse.json({
            message: 'An error occurred while processing your request.',
            body: JSON.stringify({ message: "Internal Server Error" }),
        })
    }
}