import { NextRequest, NextResponse } from "next/server";
import { Fail } from "@/HelperFunctions/ApiResponseFail";
import { API_ENDPOINTS } from "@/lib/constants";
import { ApiResponse } from "@/Types/DetailedTypes";
import { AuthorDto } from "@/Types/BookTypes";


export async function GET(req: NextRequest){
    const token = req.cookies.get("token")?.value;
    const res = await fetch(API_ENDPOINTS.BOOKS_AUTHORS, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if ( !res.ok ) {
        if ( res.status === 401)
            return Fail(res.status, "Not authenticated", "Unauthorized");
        return Fail(res.status, "Error while fetching data", "Fetch error");
    }
    const apiResponse: ApiResponse<AuthorDto[]> = await res.json();
    return NextResponse.json(apiResponse, { status: res.status});
}