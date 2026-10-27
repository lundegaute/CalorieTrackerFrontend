import { ErrorResponse, LoginUserDTO } from '@/Types/types';
import { API_ENDPOINTS } from '@/lib/constants';
import { useAuthStore } from '@/components/Zustand/AuthStore';

export async function FetchLoginPost(body: LoginUserDTO): Promise<{success: true, token: string} | {success: false, error: string}> {
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
        const errorData: {message: string}  = await res.json();
        return {success: false, error: errorData.message || "An error occurred while fetching data"};
    }
    console.log("---------- Login Success ----------");
    const data = await res.json();
    return {success: true, token: data.token};
}