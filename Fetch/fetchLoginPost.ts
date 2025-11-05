import { ErrorResponse, LoginUserDTO } from '@/Types/types';
import { API_ENDPOINTS } from '@/lib/constants';

export async function FetchLoginPost(body: LoginUserDTO): Promise<{success: true, token: string} | {success: false, error: ErrorResponse}> {
    console.log("---------- FETCH LOGIN POST ----------");
    const res = await fetch("/api/Auth/Login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const errorData: ErrorResponse = await res.json();
        return {success: false, error: errorData || "An error occurred while fetching data"};
    }
    console.log("---------- Login Success ----------");
    const data = await res.json();
    return {success: true, token: data.token};
}