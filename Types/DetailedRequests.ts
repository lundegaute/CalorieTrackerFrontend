
export type DetailedMealPlanRequest = {
    name: string;
}
export type DetailedMealRequest = {
    name: string;
    detailedMealPlanId: number;
}
export type DetailedMealComponentRequest = {
    detailedMealId: number;
    quantity: number;
    detailedFoodId: number;
}

export type UpdateDetailedMealComponentRequest = {
    detailedMealComponentId: number;
    detailedMealId: number;
    quantity: number;
}

export type DetailedDeleteRequest = {
    id: number;
}
