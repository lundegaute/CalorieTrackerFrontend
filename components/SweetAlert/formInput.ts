import Swal from "sweetalert2";

export async function sweetAlertInput(title: string, mealPlanName: string) {
    const result = await Swal.fire( {
        title: title,
        input: "text",
        inputPlaceholder: "Enter name",
        inputValue: mealPlanName,
        showCancelButton: true,
        confirmButtonText: "Add",
        cancelButtonText: "Cancel"
    });
    if ( result.isDismissed || !result.value) {
        return;
    }
    return result.value;
}

export async function sweetAlertAddMealPlan() {
  const result = await Swal.fire({
    title: "Add meal plan name",
    input: "text",
    inputPlaceholder: "Enter name",
    showCancelButton: false,
    confirmButtonText: "Add",
    //cancelButtonText: "Cancel",
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value || !value.trim()) {
        return "Meal plan name cannot be empty";
      }
      if (value.trim().length < 2) {
        return "At least 2 characters";
      }
      return null;
    },
  });
  return result.value.trim();
}

export async function sweetAlertMultipleInputs() {
  const result = await Swal.fire({
    title: "Add Item",
    html: `
      <input id="input1" class="swal2-input" placeholder="Name">
      <input id="input2" class="swal2-input" placeholder="Calories" type="number">
      <input id="input3" class="swal2-input" placeholder="Protein" type="number">
      <input id="input4" class="swal2-input" placeholder="Category">
    `,
    showCancelButton: true,
    confirmButtonText: "Add",
    cancelButtonText: "Cancel",
    focusConfirm: false,
    preConfirm: () => {
      const input1 = (document.getElementById('input1') as HTMLInputElement).value;
      const input2 = (document.getElementById('input2') as HTMLInputElement).value;
      const input3 = (document.getElementById('input3') as HTMLInputElement).value;
      const input4 = (document.getElementById('input4') as HTMLInputElement).value;
      
      if (!input1 || !input2 || !input3 || !input4) {
        Swal.showValidationMessage('Please fill in all fields');
        return false;
      }
      
      return {
        name: input1,
        calories: parseInt(input2),
        protein: parseInt(input3),
        category: input4
      };
    }
  });
  
  if (result.isConfirmed) {
    return result.value;
  }
  return null;
}