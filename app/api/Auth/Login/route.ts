import { NextResponse, NextRequest } from 'next/server';
import { LoginUserDTO, ErrorResponse, LoginResponse } from '@/Types/types';
import {API_ENDPOINTS} from '@/lib/constants';

export async function POST(req: NextRequest) {
    console.log("---------- API LOGIN ROUTE ----------");
    console.log(API_ENDPOINTS.LOGIN);
    console.log("Request body:", req.body);
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

        // ADD DEBUGGING - Check what cookies the backend sent
        console.log("Backend response headers:", response.headers);
        console.log("Set-Cookie header:", response.headers.get('set-cookie'));

        if (!response.ok) {
            const errorData: ErrorResponse = await response.json();
            return NextResponse.json(errorData, { status: response.status });
        }
        
        console.log("---------- API LOGIN ROUTE RESPONSE WITH TOKEN ----------");
        const data = await response.json();
        // Set the cookie and return success
        console.log("---------- TOKEN:");
        console.log(data.token);
        const nextResponse = NextResponse.json({data}, { status: 200});
        nextResponse.cookies.set("token", data.token, {
            httpOnly: true,
            secure: false, // Set to true in production
            sameSite: "lax",
            path: "/",
        });
        
        return nextResponse;
    } catch (error) {
        console.log("---------- API LOGIN ROUTE ERROR ----------");
        console.error("Error during login:", error);
        const errorResponse: ErrorResponse = {
            message: { Error: ["An unexpected error occurred during login, from /api/Auth/Login"] },
            type: "InternalServerError",
            title: "Login Error",
            status: 500
        }
        return NextResponse.json(errorResponse, { status: 500 });
    }
}