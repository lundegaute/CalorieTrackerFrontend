import { NextRequest, NextResponse } from "next/server";
import { Fail } from "@/HelperFunctions/ApiResponseFail";
import { API_ENDPOINTS } from "@/lib/constants";
import { ApiResponse } from "@/Types/DetailedTypes";
import { UpdateBookRequest } from "@/Types/BookTypes";



export async function PUT(req: NextRequest){
    const token = req.cookies.get("token")?.value;
    const body: UpdateBookRequest = await req.json();
    console.log(body);
    
    const res = await fetch(API_ENDPOINTS.BOOKS_UPDATE, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });
    if ( !res.ok ){
        if (res.status === 401)
            return Fail(res.status, "Not authenticated", "Unauthorized");
        else {
            const errorMessage = await res.json();
            console.log(errorMessage);
            return Fail(res.status, "Error during book update", "Update error");
        }
    }
    const response: ApiResponse<string> = await res.json();
    return NextResponse.json(response.data, { status: res.status});

}