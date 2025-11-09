
// Use Azure URL if available, otherwise fallback to localhost for development
const BASE_URL = process.env.NEXT_PUBLIC_CalorieTracker_Base_Azure_Url || "http://localhost:5299/api";
console.log("BASE_URL:", BASE_URL);
export const API_ENDPOINTS = {
    base: BASE_URL,
    LOGIN: `${BASE_URL}/User/Login`,
    LOGOUT: `${BASE_URL}/User/Logout`,
    REGISTER: `${BASE_URL}/User/Register`,
    USER: `${BASE_URL}/User`,
    MEALPLAN: `${BASE_URL}/MealPlan`,
    MEAL_NAME: `${BASE_URL}/MealName`,
    MEAL: `${BASE_URL}/Meal`,
    SEARCH: `${BASE_URL}/Search`,
    FOOD: `${BASE_URL}/Foods`,
    FOODSQL: `${BASE_URL}/FoodSql`,
    FOODSEARCH: `${BASE_URL}/FoodSql/Search`,

}
