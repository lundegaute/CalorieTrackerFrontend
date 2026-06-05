import {NextRequest, NextResponse} from "next/server";
import { API_ENDPOINTS } from "@/lib/constants";
import { ApiResponse, DetailedFoodDTO } from "@/Types/DetailedTypes";

export async function POST(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const body = await req.json();
    try {
        const res = await fetch(API_ENDPOINTS.DETAILED_SEARCH, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`
            },
            body: JSON.stringify(body),
        });
        if (!res.ok) {
            const errorResponse: ApiResponse<DetailedFoodDTO[]> = await res.json();
            return NextResponse.json(errorResponse, {status: res.status});
        }
        const apiResponse: ApiResponse<DetailedFoodDTO[]> = await res.json();
        return NextResponse.json(apiResponse, {status: 200})
    }
    catch (error) {
        const errorResponse:ApiResponse<DetailedFoodDTO[]> = {
            isSuccess: false,
            data: null,
            errors: ["Internal server error"],
            types: ["Server error"],
            statusCode: 500
        };
        return NextResponse.json(errorResponse, { status: 500});   
    }
}