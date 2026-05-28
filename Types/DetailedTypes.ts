export type ApiResponse<T = any> = {
    isSuccess: boolean;
    data: T | null;
    errors: string[];
    types: string[];
    statusCode: number;
}

// MealPlan can have several meals (Frokost and Middag and Kveldsmat)
export type DetailedCompleteOverviewDTO = {
    id: number;
    name: string;
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFats: number;
    detailedMeals: DetailedMealDTO[];
}

// A single meal: Frokost or Middag or Kveldsmat
export type DetailedMealDTO = {
    id: number;
    name: string; // Frokost
    totalCalories: number; // Sum of all components
    totalProtein: number;
    totalCarbs: number;
    totalFats: number;

    components: DetailedMealComponentDTO[];
}

// Logged meal: 120g Havregryn
export type DetailedMealComponentDTO = {
    id: number;
    quantity: number; // 120g
    totalCalories: number; // 443.2 Kcals
    totalProtein: number; // 22g
    totalCarbs: number; // 67.3g
    totalFats: number; // 6.9g

    detailedFood: DetailedFoodDTO;
}

// Details about a single food item ( Havregryn )
export type DetailedFoodDTO = {
    id: number;
    foodName: string;
    foodGroupId: number;
    calories: number | null; // Base calories per 100g
    energy: number | null;

    constituents: FoodConstituentsDTO[];
}

// Macro and micro nutrients for a specific food item ( havregryn )
export type FoodConstituentsDTO = {
    id: number;
    quantity: number | null;
    nutrientId: number; 
    nutrient: NutrientDTO;
}

// Details about a single nutrient ( Protein, Vitamin A, Sink )
export type NutrientDTO = {
    nutrientId: string; // VitA, Zn, Vit B12
    nutrientName: string; // Protein, Sink
    defaultUnit: string | null; // g, mg
}