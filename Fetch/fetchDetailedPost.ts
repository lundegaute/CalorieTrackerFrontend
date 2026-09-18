import { ApiResponse, DetailedFoodDTO } from "@/Types/DetailedTypes";
import { ErrorResponse } from "@/Types/types";

export async function fetchDetailedPost<T, BodyType>(url: string, body: BodyType)
    : Promise<ApiResponse<T>> {
    console.log("----- FETCH DETAILED POST -----");
    console.log(url);
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
    });
    const data: ApiResponse<T> = await res.json();
    return data;

}
    
    
