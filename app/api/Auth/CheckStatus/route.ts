import { API_ENDPOINTS } from '@/lib/constants';
import { ApiResponse } from '@/Types/DetailedTypes';
import { UserDTO } from '@/Types/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    if (!token) return Fail(401, 'Not authenticated', 'Unauthorized');

    const res = await fetch(API_ENDPOINTS.USER_ME, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        return Fail(res.status, 'Not authenticated', 'Unauthorized');
    }
    const apiResponse: ApiResponse<UserDTO> = await res.json();
    return NextResponse.json(apiResponse, { status: res.status });
}

function Fail(status: number, message: string, type: string) {
    const body: ApiResponse<null> = {
        isSuccess: false,
        data: null,
        errors: [message],
        types: [type],
        statusCode: status,
    };
    return NextResponse.json(body, { status });
}
