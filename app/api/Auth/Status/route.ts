import { NextRequest, NextResponse} from "next/server";
import ValidateToken from "@/HelperFunctions/validateToken";

interface ValidateToken {
    message: string;
    type: string; 
    title: string; 
    status: number; 
    redirect: string;
}


export async function GET(req: NextRequest) {
    const token = req.cookies.get("token")?.value || "";
    const result: ValidateToken = ValidateToken(token);

    if (  result.title === "Token expired" || result.title === "Token invalid" || result.title === "Token not found") {
        return NextResponse.json(
            { authenticated: false, reason: result.message },
            { status: 401 }
        );
    } else {
        return NextResponse.json(
            { authenticated: true},
            { status: 200 }
        )
    }
}