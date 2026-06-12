import Swal from "sweetalert2";
import { DetailedMealPlanRequest } from "@/Types/DetailedRequests";
import { fetchDetailedPost } from "@/Fetch/DetailedFetch/DetailedPost";
import { SweetAlertWarning, SweetAlertSuccess } from "@/components/SweetAlert/DetailedSweetAlert/FeedBack";
import { ApiResponse } from "@/Types/DetailedTypes";

export async function SweetAlertSingleInput<T>(title: string, placeHolderName: string){
    const result = await Swal.fire( {
        title: title,
        input: "text",
        theme: "dark",
        backdrop: true,
        inputPlaceholder: "Enter name",
        inputValue: placeHolderName,
        showCancelButton: true,
        confirmButtonText: "Add",
        cancelButtonText: "Cancel"
    });
    if ( result.isDismissed || !result.value) {
        return;
    }
    if ( result.isConfirmed && result.value.length > 2) {
        const body: DetailedMealPlanRequest = {
            name: result.value
            };
        const res: ApiResponse<T> = await fetchDetailedPost<T, DetailedMealPlanRequest>("/api/DetailedMealPlans", body);
        if ( !res.isSuccess) {
            SweetAlertWarning(res.errors[0], "Ok");
            return
        }
        else {
            return res;
        }
    }

}