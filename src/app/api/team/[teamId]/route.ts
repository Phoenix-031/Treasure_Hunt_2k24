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

        console.log(res,"is it there?")

        return NextResponse.json({
            message: 'Team retrieved successfully',
            data: res
        })
        
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: 'An error occurred while processing your request.',
            body: JSON.stringify({ message: "Internal Server Error" }),
        })
    }
}