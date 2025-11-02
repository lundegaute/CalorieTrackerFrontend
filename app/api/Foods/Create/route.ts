import {NextRequest, NextResponse} from "next/server";
import { API_ENDPOINTS } from "@/lib/constants";
import { ErrorResponse, AddFoodDTO, FoodDTO} from "@/Types/types";


export async function POST(req: NextRequest) {
    const foodToCreate = await req.json() as AddFoodDTO;
    const token = req.cookies.get("token")?.value;

    try {
        const res = await fetch(API_ENDPOINTS.FOODSQL, {
            method: "POST",
            headers: {
                "Content-Type": "Application/Json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(foodToCreate),
        })

        if ( !res.ok ) {
            const errorData = await res.json() as ErrorResponse;
            return NextResponse.json(
                errorData,
                { status: errorData.status}
            )
        }
        const data = await res.json() as FoodDTO;
        return NextResponse.json(
            data,
            { status: 200}
        );
    } catch ( error) {
        console.log("----- API CREATE FOOD ROUTE -----");
        console.log(error);
        const errorData: ErrorResponse = {
            message: {
                Error: ["API CREATE FOOD ROUTE server error"]
            },
            title: "Server error from POST request",
            type: "Server error",
            status: 500,
        }
        return NextResponse.json(
            errorData,
            { status: errorData.status}
        );
    }

}