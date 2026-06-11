import {NextRequest, NextResponse} from "next/server";
import { API_ENDPOINTS } from "@/lib/constants";
import { ApiResponse } from "@/Types/DetailedTypes";
import { DetailedDeleteRequest } from "@/Types/DetailedRequests";

export async function POST<T>(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const body: T = await req.json();
    try {
        const res = await fetch(API_ENDPOINTS.DETAILED_ADD_MEAL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
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

export async function DELETE(req: NextRequest) {
    const deleteRequest: DetailedDeleteRequest = await req.json();
    const token = await req.cookies.get("token")?.value;
    try {
        const res = await fetch(`${API_ENDPOINTS.DETAILED_DELETE_MEAL}/${encodeURIComponent(deleteRequest.id)}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        if ( !res.ok) {
            const apiResponse: ApiResponse<string> = await res.json();
            return NextResponse.json(apiResponse, {status: res.status});
        }
        const apiResponse: ApiResponse<string> = await res.json();
        return NextResponse.json(apiResponse, {status: apiResponse.statusCode})
    } catch (error) {
        const apiResponse: ApiResponse<string> = {
            isSuccess: false,
            data: null,
            errors: ["Server erorr from DetailedMealPlan Route"],
            types: ["Server error"],
            statusCode: 500
        };
        return NextResponse.json(apiResponse, { status: 500 });
    }
}