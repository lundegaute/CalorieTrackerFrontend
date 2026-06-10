import Swal from "sweetalert2";

export function SweetAlertSuccess(message: string, confirmButtonText: string) {
    return Swal.fire({
        title: message,
        icon: "success",
        confirmButtonText: confirmButtonText,
        theme: "dark",
    })
}

export function SweetAlertWarning(message: string, confirmButtonText: string) {
    return Swal.fire({
        title: "Warning",
        text: message,
        icon: "warning",
        confirmButtonText: confirmButtonText,
        theme: "dark",
    })
}