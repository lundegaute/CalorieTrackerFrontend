import { API_ENDPOINTS } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";
import { Fail } from "@/HelperFunctions/ApiResponseFail";
import { ApiResponse } from "@/Types/DetailedTypes";
import { BookDto } from "@/Types/BookTypes";

export async function GET(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const res = await fetch(API_ENDPOINTS.BOOKS, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    if (!res.ok){
        if (res.status == 401)
            return Fail(res.status, "Not authenticated", "Unauthorized");
        return Fail(res.status, "Error while fetching data", "Fetch error");
    }
    const response: ApiResponse<BookDto[]> = await res.json();
    return NextResponse.json(response.data, {status: res.status});
}