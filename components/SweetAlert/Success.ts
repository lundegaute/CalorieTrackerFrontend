import Swal from "sweetalert2";
import { FoodDTO } from "@/Types/types";

export default function SweetAlertSuccess() {
    return Swal.fire({
        title: "User created!",
        icon: "success",
        confirmButtonText: "Go to dashboard"
    })
}

export function SweetAlertCustomFoodAdded(customFood: FoodDTO) {
    return Swal.fire({
        title: "Custom Food Added Successfully!",
        text: `${customFood.name} has been added to the database.`,
        html: `
            <div style="text-align: left; margin: 10px 0;">
                <strong>${customFood.name}</strong><br>
                <div style="margin-top: 8px;">
                    📊 <strong>Calories:</strong> ${customFood.calories} kcal<br>
                    🥩 <strong>Protein:</strong> ${customFood.protein}g<br>
                    🍞 <strong>Carbs:</strong> ${customFood.carbohydrates}g<br>
                    🧈 <strong>Fat:</strong> ${customFood.fat}g
                </div>
            </div>
        `,
        icon: "success",
        confirmButtonText: "Great!",
        confirmButtonColor: "#10b981",
        timer: 5000,
        timerProgressBar: true,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
}