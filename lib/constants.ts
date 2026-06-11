
// Use Azure URL if available, otherwise fallback to localhost for development
const BASE_URL = "http://localhost:5299/api";
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

    DETAILED_MEAL_PLAN_OVERVIEW: `${BASE_URL}/DetailedMealPlan/overview`,

    DETAILED_ADD_MEALPLAN: `${BASE_URL}/DetailedMealPlan/add`,
    DETAILED_ADD_MEAL: `${BASE_URL}/DetailedMeal/add`,
    DETAILED_ADD_MEALCOMPONENT: `${BASE_URL}/DetailedMealComponent/add`,

    DETAILED_DELETE_MEALPLAN: `${BASE_URL}/DetailedMealPlan/Delete`,
    DETAILED_DELETE_MEAL: `${BASE_URL}/DetailedMeal/Delete`,
    DETAILED_DELETE_MEAL_COMPONENT: `${BASE_URL}/DetailedMealComponent/Delete`,

    DETAILED_SEARCH: `${BASE_URL}/DetailedFood/search`,

}
