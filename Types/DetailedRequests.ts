
export type DetailedMealPlanRequest = {
    name: string;
}
export type DetailedMealRequest = {
    name: string;
    detailedMealPlanId: number;
}
export type DetailedMealComponentRequest = {
    
}

export type DetailedDeleteRequest = {
    id: number;
}