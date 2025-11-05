import { NextResponse, NextRequest } from "next/server";
import { API_ENDPOINTS } from "@/lib/constants";

export async function POST(req: NextRequest) {

    try {
        await fetch(API_ENDPOINTS.LOGOUT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // Include cookies stored in the browser
        });
        const response = NextResponse.json(
            { message: "Logout Successful" },
            { status: 200 }
        );
        const token = req.cookies.get("token")?.value;
        console.log("---------- LOGOUT TOKEN ----------");
        console.log(token);
        response.cookies.delete("token");
        return response;
        
    } catch ( error ) {
        const response = NextResponse.json(
            { message: "Logout Failed", error: error },
            { status: 500 }
        );
        response.cookies.delete("token");
        return response;
    }
}