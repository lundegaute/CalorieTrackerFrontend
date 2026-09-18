import { NextResponse, NextRequest } from "next/server";
import { API_ENDPOINTS } from "@/lib/constants";
import { ApiResponse } from "@/Types/DetailedTypes";

export async function POST<T, BodyType>(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const body: BodyType = await req.json();
    try {
        const res = await fetch(API_ENDPOINTS.DETAILED_ADD_MEALCOMPONENT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify([body]),
        });
        if ( !res.ok ) {
            const apiResponse: ApiResponse<T> = await res.json();
            return NextResponse.json(apiResponse, {status: res.status});
        }
        const apiResponse: ApiResponse<T> = await res.json();
        return NextResponse.json(apiResponse, {status: apiResponse.statusCode});
    }
    catch (error) {
        const apiResponse: ApiResponse<null> = {
            isSuccess: false,
            data: null,
            errors: ["Error during fetch from Next.js API to Backend"],
            types: ["Server Error"],
            statusCode: 500,
        };
        return NextResponse.json(apiResponse, {status: apiResponse.statusCode});
    }
}


export async function PUT<T, BodyType>(req: NextRequest) {
    console.log("ROUTE: DetailedMealComponents => PUT");
    const token = req.cookies.get("token")?.value;
    const body: BodyType = await req.json();
    try {
        const res = await fetch(API_ENDPOINTS.DETAILED_UPDATE_MEALCOMPONENT, {
            method: "PUT",
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
        const apiResponse: ApiResponse<T> = await res.json();
        return NextResponse.json(apiResponse, {status: apiResponse.statusCode});
    }
    catch (error) {
        const apiResponse: ApiResponse<null> = {
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
    const deleteRequest = await req.json();
    const token = await req.cookies.get("token")?.value;
    try {
        const res = await fetch(`${API_ENDPOINTS.DETAILED_DELETE_MEAL_COMPONENT}/${encodeURIComponent(deleteRequest.id)}`, {
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