import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../_config/connectDb';
import { LoginSchema } from '../../_validation/user.validation';
import TeamModel from '../../_model/team.model';

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const LoginVerified = LoginSchema.safeParse(body);

        if (!LoginVerified.success) {
            return NextResponse.json({
                success: false,
                message: 'Invalid login data provided',
                body: { message: 'Invalid login data' },
            });
        }

        const { teamId, teamName } = LoginVerified.data;

        const team = await TeamModel.aggregate([
            { $match: { teamId, teamName } },
            { $limit: 1 }
        ]);

        if (team.length === 0) {
            return NextResponse.json({
                success: false,
                message: 'Team not found or invalid team name',
                body: { message: 'Team not found or invalid team name' },
            });
        }

        const teamData = team[0];

        if (teamData.isDisqualified || teamData.numberOfLives === 0) {
            return NextResponse.json({
                success: false,
                message: 'Team is disqualified',
                body: { message: 'Team is disqualified' },
            });
        }

        return NextResponse.json({
            message: 'Login successful',
            success: true,
            res: teamData,
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'An error occurred while processing your request.',
        });
    }
}
