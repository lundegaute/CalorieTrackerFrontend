import { ErrorResponse } from "@/Types/types";
import {useAuthStore} from "@/components/Zustand/AuthStore";
import notLoggedInWarning from "@/components/SweetAlert/notLoggedIn";
import { RedirectToLogin } from "@/HelperFunctions/RedirectToLogin";

export async function fetchGet<T>(url: string): Promise<T> {
    try {
        const res = await fetch(url, {
            method: "GET",
            credentials: "include", // Sending browser cookies to the next.js server router
        });
        if (!res.ok) {
            console.log("------ FETCH GET NOT OK -----"); 
            const errorData: ErrorResponse = await res.json();
            console.log(errorData.title);
            if (errorData.type === "Authorization" || errorData.type === "Unauthorized") {
                notLoggedInWarning().then(() => {
                    RedirectToLogin();
                });
            };
            throw (errorData);
        }
        const data: T = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        const errorResponse: ErrorResponse = {
            message: { Error: ["Network error occurred while fetching data"] },
            type: "NetworkError",
            title: "Fetch Error",
            status: 500
        };
        throw (errorResponse);
    }
}