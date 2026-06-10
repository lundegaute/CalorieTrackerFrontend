import Swal from "sweetalert2";
import { DetailedMealPlanRequest } from "@/Types/DetailedRequests";
import { fetchDetailedPost } from "@/Fetch/DetailedFetch/DetailedPost";
import { SweetAlertWarning, SweetAlertSuccess } from "@/components/SweetAlert/DetailedSweetAlert/FeedBack";

export async function SweetAlertSingleInput(title: string, mealPlanName: string) {
    const result = await Swal.fire( {
        title: title,
        input: "text",
        theme: "dark",
        backdrop: true,
        inputPlaceholder: "Enter name",
        inputValue: mealPlanName,
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
        const res = await fetchDetailedPost<string, DetailedMealPlanRequest>("/api/DetailedMealPlans", body);
        if ( !res.isSuccess) {
            SweetAlertWarning(res.errors[0], "Ok");
            return
        }
        else {
            console.log(body);
            SweetAlertSuccess("MealPlan added successfully", "Great");
            return;
        }
    }

}