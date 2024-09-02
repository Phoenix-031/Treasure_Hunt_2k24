import { NextRequest, NextResponse } from "next/server";
import connectDB from "../_config/connectDb";
import TeamModel from "../_model/team.model";

export async function GET() {
    try {
        await connectDB();

        const teams = await TeamModel.aggregate([
            {
                $match : {}
            },
            {
                $project: {
                    teamName : 1,
                    teamId : 1,
                    currentQuestionStage : 1,
                    lastStageUpdate : 1,
                }
            },
            {
                $sort:{
                    currentQuestionStage: -1,
                }
            },
            {
                $group : {
                    _id : "$currentQuestionStage",
                    teams: {
                        $push: {
                            teamName: "$teamName",
                            teamId: "$teamId",
                            lastStageUpdate : "$lastStageUpdate",
                            updatedAt: "$updatedAt"
                        }
                    }
                }
            },
            {
                $sort: {
                    _id : -1
                }
            },
            {
                $addFields: {
                    teams: {
                        $map: {
                            input: "$teams",
                            as: "team",
                            in: {
                                $mergeObjects: [
                                    "$$team",
                                    {
                                        lastStageUpdate: {
                                            $dateToString: {
                                                format: "%Y-%m-%dT%H:%M:%S.%LZ",
                                                date: "$$team.lastStageUpdate"
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            {
                $unwind: "$teams"
            },
            {
                $project: {
                    _id: 0,
                    teamName: "$teams.teamName",
                    teamId: "$teams.teamId",
                    currentQuestionStage: "$_id",
                    lastStageUpdate: "$teams.lastStageUpdate"
                }
            }
        ])

        if(!teams) {
            return NextResponse.json({
                status: 404,
                body: {
                    success: false,
                    message: 'No teams found'
                }
            })
        }

        return NextResponse.json({
            status: 200,
            body: {
                success: true,
                data: teams
            }
        })

    } catch (error) {
        return NextResponse.json({
            status: 500,
            body: {
                success: false,
                message: 'Internal server error'
            }
        })
    }
}