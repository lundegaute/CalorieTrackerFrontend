export type ApiResponse<T> = {
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
    detailedMeals: DetailedMealDTO[];
}

// A single meal: Frokost or Middag or Kveldsmat
type DetailedMealDTO = {
    id: number;
    name: string;
    totalCalories: number; // Sum of all components
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;

    components: DetailedMealComponentDTO[];
}

// Logged meal: 120g Havregryn
type DetailedMealComponentDTO = {
    id: number;
    quantity: number; // 120g
    totalCalories: number; // 443.2 Kcals
    totalProtein: number; // 22g
    totalCarbs: number; // 67.3g
    totalFat: number; // 6.9g

    detailedFoodDTO: DetailedFoodDTO;
}

// Details about a single food item ( Havregryn )
type DetailedFoodDTO = {
    id: number;
    foodName: string;
    foodGroupId: number;
    calories: number | null; // Base calories per 100g
    energy: number | null;

    constituents: FoodConstituentsDTO[];
}

// Macro and micro nutrients for a specific food item ( havregryn )
type FoodConstituentsDTO = {
    id: number;
    quantity: number | null;
    nutrientId: number; 
    nutrient: NutrientDTO;
}

// Details about a single nutrient ( Protein, Vitamin A, Sink )
type NutrientDTO = {
    nutrientId: string; // VitA, Zn, Vit B12
    nutrientName: string; // Protein, Sink
    defaultUnit: string | null; // g, mg
}