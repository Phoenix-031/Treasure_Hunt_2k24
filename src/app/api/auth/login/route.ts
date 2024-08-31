import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../_config/connectDb';

export async function POST(req: NextRequest){
    try {
        
        await connectDB();

        const body = await req.json();
        
    } catch (error) {
        return NextResponse.json({
            message: 'An error occurred while processing your request.',
            description: JSON.stringify(error),
        });   
    }
}