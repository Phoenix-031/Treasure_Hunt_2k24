import { NextRequest, NextResponse } from "next/server"
import { store } from "./store";

export function middleware(request :  NextRequest){

    const userInfo= {
        progress: 'puzzlesol_'
    }


    // const progressLevel = userInfo.progress.split('_').length - 1;
    // const currentQuestion = parseInt(request.nextUrl.pathname.split('/')[2][1]);


    // if (currentQuestion !== progressLevel) {
    //     return NextResponse.rewrite(new URL(`/question/q${progressLevel}`, request.url));
    // }

        return NextResponse.next()
}

export const config = {
    // matcher: ['/question/q(\\d+)'],
}