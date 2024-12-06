import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import { getDataFromToken } from '@/helpers/getDataFromToken'
connect()

export async function GET(request: NextRequest) {
    try {
        // Extract data from token
        const userId = await getDataFromToken(request);

        // Find user in the database
        const user = await User.findOne({ _id: userId }).select("-password");

        // Check if there is no user
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // Return user data if found
        return NextResponse.json(
            { message: "User found", data: user },
            { status: 200 }
        );
    } catch (error:any) {
        // Handle any errors
        return NextResponse.json(
            { message: "Error retrieving user", error: error.message },
            { status: 500 }
        );
    }
}

