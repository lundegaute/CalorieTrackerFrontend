import Swal from "sweetalert2";
import { FoodDTO } from "@/Types/types";

export function SweetAlertWarning(message: string) {
    return Swal.fire({
        title: "Warning",
        text: message,
        icon: "warning",
        confirmButtonText: "Go to dashboard"
    })
}