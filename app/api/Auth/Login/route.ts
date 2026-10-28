import { NextResponse, NextRequest } from 'next/server';
import { LoginUserDTO, ErrorResponse, LoginResponse } from '@/Types/types';
import {API_ENDPOINTS} from '@/lib/constants';

export async function POST(req: NextRequest) {
    const body: LoginUserDTO = await req.json();
    try {
        const response = await fetch(API_ENDPOINTS.LOGIN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            credentials: 'include', // Include cookies in the request
        });

        if (!response.ok) {
            const errorResponse: {message: string} = await response.json();
            return NextResponse.json(errorResponse.message, { status: response.status });
        }
        
        const data = await response.json();
        const nextResponse = NextResponse.json({data}, { status: 200});
        nextResponse.cookies.set("token", data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "lax",
            path: "/",
        });
        
        return nextResponse;
    } catch (error) {
        console.log("---------- API LOGIN ROUTE ERROR ----------");
        console.error("Error during login:", error);
        const errorResponse: {message: string} = {
            message: "Internal server error. Is api online?",
        }
        return NextResponse.json(errorResponse.message, { status: 500 });
    }
}