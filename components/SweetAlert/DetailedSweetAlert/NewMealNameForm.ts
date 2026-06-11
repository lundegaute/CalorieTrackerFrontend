import Swal from "sweetalert2";
import { DetailedMealRequest } from "@/Types/DetailedRequests";
import { fetchDetailedPost } from "@/Fetch/DetailedFetch/DetailedPost";
import { SweetAlertWarning, SweetAlertSuccess } from "@/components/SweetAlert/DetailedSweetAlert/FeedBack";

export async function NewMealNameForm(title: string, placeHolderName: string, detailedMealPlanId: number) {
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
    if ( result.isConfirmed && result.value.length >= 2) {
        const body: DetailedMealRequest = {
            name: result.value,
            detailedMealPlanId: detailedMealPlanId
        };
        const res = await fetchDetailedPost<string, DetailedMealRequest>("/api/DetailedMeals", body);
        if ( !res.isSuccess) {
            SweetAlertWarning(res.errors[0], "Ok");
            return
        }
        else {
            return;
        }
    }

}