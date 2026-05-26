import { NextResponse, NextRequest } from "next/server";
import {ApiResponse, DetailedCompleteOverviewDTO } from "@/Types/DetailedTypes";
import { API_ENDPOINTS } from "@/lib/constants";


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
        const apiResponse: ApiResponse<DetailedCompleteOverviewDTO[]> = await res.json();
        const nextResponse = NextResponse.json(apiResponse, {status: res.status});
        return nextResponse;
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