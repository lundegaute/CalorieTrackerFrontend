import { ApiResponse } from "@/Types/DetailedTypes";

export async function fetchDetailedPut<T, bodyType>(url: string, body: bodyType)
    : Promise<ApiResponse<T>> {
    console.log("----- FETCHPUT -----");
    console.log(url);
    const res = await fetch(url, {
        method: "PUT",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
    });
    const apiResponse: ApiResponse<T> = await res.json();
    return apiResponse;
}