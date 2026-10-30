import { ApiResponse } from "@/Types/DetailedTypes";
import { NextResponse } from "next/server";

export function Fail(status: number, message: string, type: string) {
    const body: ApiResponse<null> = {
        isSuccess: false,
        data: null,
        errors: [message],
        types: [type],
        statusCode: status,
    };
    return NextResponse.json(body, { status });
}