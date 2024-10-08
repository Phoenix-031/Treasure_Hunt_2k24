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
    answerCode : z.string().max(10, {
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

        if (question.answerCode !== answerCode) {
            team.numberOfLives -= 1;
            await team.save();

            return NextResponse.json({
                success: false,
                updatedTeam: { numberOfLives: team.numberOfLives },
                message: 'Incorrect answer code',
                body: { numberOfLives: team.numberOfLives },
            });
        }

        const totalQuestions = await QuestionModel.countDocuments();
        team.progressString += answerCode + '_';
        team.currentQuestionStage = team.currentQuestionStage + 1 > totalQuestions ? -1 : team.currentQuestionStage + 1;

        await team.save();

        return NextResponse.json({
            success: true,
            message: 'Answer code verified',
            body: {
                numberOfLives: team.numberOfLives,
                currentQuestionStage: team.currentQuestionStage,
            },
        });

    } catch (error) {
        return NextResponse.json({
            message: 'An error occurred while processing your request.',
            body: JSON.stringify({ message: "Internal Server Error" }),
        })
    }
}