import { NextRequest, NextResponse } from "next/server"
import { api } from "./query/api";

export async function middleware(request :  NextRequest){

    const response = NextResponse.next();

    const teamId = request.nextUrl.pathname.split('/')[1]
    const questionId = request.nextUrl.pathname.split('/')[3]

    const team = await api.get(`/team/${teamId}`)
    const teamData= team.data;
    const currentTeamStage = teamData.data.currentQuestionStage;
    const stageId = `q${teamData.data.currentQuestionStage}`

    if(currentTeamStage === null){
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    else if(stageId !== questionId){
       return NextResponse.redirect(new URL(`/${teamId}/question/q${teamData.data.currentQuestionStage}`, request.url));
    }

    return response;
}

export const config = {
    matcher: ['/([a-zA-Z0-9_-]+)/question/q([1-6])'],
}