import {NextResponse, NextRequest } from "next/server";
import { API_ENDPOINTS } from "@/lib/constants";
import { ErrorResponse, FoodFromSql } from "@/Types/types";
import { ApiResponse, NutrientRecommendationDTO } from "@/Types/DetailedTypes";


function Fail(status: number, message: string, type: string){
    const body: ApiResponse<null> = {
        isSuccess: false,
        data: null,
        errors: [message],
        types: [type],
        statusCode: status
    }
    return NextResponse.json(body, {status});
}

const basicHeaders = (token: string | undefined) => {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
};


export async function GET(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    if (!token) return Fail(401, "Not authenticated", "Unauthorized");
    
    try {
        const res = await fetch(API_ENDPOINTS.DETAILED_FOOD_RECOMMENDATIONS, {
            method: "GET",
            headers: basicHeaders(token),
            signal: AbortSignal.timeout(10_000),   // give up after 10 s
        });

        if ( res.status === 401){
            return Fail(401, "Not Authenticated", "Unauthorized");
        }

        const apiResponse: ApiResponse<NutrientRecommendationDTO[]> = await res.json();
        return NextResponse.json(
            apiResponse,
            { 
                status: 200,
                headers: { "Cache-Control": "private, max-age=3600" }
            }
        );

    } catch (error){
        const isTimeout = error instanceof Error && error.name === "TimeoutError";
        console.error("[recommendations] request failed", error);

        return isTimeout
            ? Fail(504, "The server took too long to respond", "Timeout")
            : Fail(502, "Could not reach the api server", "Fetch error");
    }
};

export async function POST(req: NextRequest) {
    console.log("----- API ADD FOOD ROUTE -----");
    const token = req.cookies.get("token")?.value;
    const body = await req.json();
    console.log(API_ENDPOINTS.FOODSQL);

    try {
        const res = await fetch(API_ENDPOINTS.FOODSQL, {
        method: "POST",
        headers: {
            "Content-Type": "Application/Json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body),
        })
        if( !res.ok ) {
            console.log("----- API ADD FOOD ROUTE NOT OK -----");
            const errorData = await res.json() as ErrorResponse;
            return NextResponse.json(
                errorData,
                { status: errorData.status}
            );
        };
        const data = await res.json() as FoodFromSql;
        return NextResponse.json(
            data,
            { status: 200 }
        );

    } catch (error) {
        console.log("----- API ADD FOOD ROUTE ERROR -----");
        console.log(error);
        const errorData: ErrorResponse = {
            message: {
                Error: ["Server error"]
            },
            title: "Server error",
            type: "Server error",
            status: 500,
        }
        return NextResponse.json(
            errorData,
            { status: 500 }
        );
    };
};