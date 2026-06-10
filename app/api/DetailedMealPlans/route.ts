import { NextResponse, NextRequest } from "next/server";
import {ApiResponse, DetailedCompleteOverviewDTO } from "@/Types/DetailedTypes";
import { API_ENDPOINTS } from "@/lib/constants";

interface AuthResponse {
    authenticated: boolean;
    reason: string;
}

export async function POST<T>(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const body: T = await req.json();
    try {
        const res = await fetch(API_ENDPOINTS.DETAILED_ADD_MEALPLAN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`
            },
            body: JSON.stringify(body),
        });
        if ( !res.ok ) {
            const apiResponse: ApiResponse<T> = await res.json();
            return NextResponse.json(apiResponse, {status: res.status});
        }
        const apiResponse = await res.json();
        return NextResponse.json(apiResponse, {status: apiResponse.statusCode});
    }
    catch (error) {
        const apiResponse: ApiResponse<T> = {
            isSuccess: false,
            data: null,
            errors: ["Error during fetch from Next.js API to Backend"],
            types: ["Server Error"],
            statusCode: 500,
        };
        return NextResponse.json(apiResponse, {status: apiResponse.statusCode});
    }
}



export async function GET(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    try {
        const res = await fetch(API_ENDPOINTS.DETAILED_MEAL_PLAN_OVERVIEW, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`
            }
        });

        if ( res.status === 401) {
            const apiResponse: ApiResponse<string> = {
                isSuccess: false,
                data: null,
                errors: ["Unauthorized"],
                types: ["Authentication Error"],
                statusCode: 401
            }
            return NextResponse.json(apiResponse, {status: apiResponse.statusCode})
        }

        if ( res.ok) {
            const apiResponse: ApiResponse<DetailedCompleteOverviewDTO[]> = await res.json();
            const nextResponse = NextResponse.json(apiResponse, {status: res.status});
            return nextResponse;
        }
    } 
    catch (error) {
        console.error("BFF Route Handler Error:", error);
        const apiResponse: ApiResponse = {
            isSuccess: false,
            data: null,
            errors: ["Internal Server error"],
            types: ["Server Error"],
            statusCode: 500,
        };

        return NextResponse.json(
            apiResponse, 
            { status: 500 }
        );
    }


}