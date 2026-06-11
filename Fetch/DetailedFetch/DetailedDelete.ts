import { DetailedDeleteRequest } from "@/Types/DetailedRequests";
import { ApiResponse } from "@/Types/DetailedTypes";


export async function DetailedDelete(url: string, id: number) {
    const request: DetailedDeleteRequest = { id: id};
    const res = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
        credentials: "include",
    });
    const apiResponse: ApiResponse<string> = await res.json();
    return apiResponse;
}