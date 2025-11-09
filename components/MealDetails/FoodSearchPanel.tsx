"use client";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { FoodFromSql, ErrorResponse, AddMealDTO, MealDTO} from "@/Types/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {fetchPost} from "@/Fetch/fetchPost";
import {sweetAlertMultipleInputs} from "@/components/SweetAlert/formInput";

// Ctrl+Shift+F to search for sweetalert2, to see where to add it throughout the project

export default function FoodSearchPanel({mealId}: {mealId: number}) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [addingFoodId, setAddingFoodId] = useState<number | null>(null);
  const { data: foods, isLoading: isLoadingFoods } = useQuery<FoodFromSql[], ErrorResponse>({
    queryKey: ["foodsFromSql", search],
    queryFn: async () => {
      const res = await fetchPost<FoodFromSql[], string>("/api/Foods/Search", search);
      if (!res.success) throw res.error; // This is caught by react query and put into the error variable
      return res.data;
    },
    enabled: search.length >= 3,
    retry: 0, 
  });


  async function handleAddFood(food: FoodFromSql) {
    setAddingFoodId(food.id);
    
    try {
      console.log(food);
      const addMealDTO: AddMealDTO = {
        quantity: 100,
        mealNameId: mealId,
        foodId: food.id,
      };
      const addFoodToMeal = await fetchPost<MealDTO, AddMealDTO>(`/api/Meals`, addMealDTO);
      if (!addFoodToMeal.success) {
        alert(addFoodToMeal.error.message.Error[0]); // Change this to use sweetalert2
      } else {
        queryClient.refetchQueries({ queryKey: ["MealDetails", mealId] });
      }
    } finally {
      setAddingFoodId(null);
    }
  }


  return (
    <div className="space-y-3">
      <TextField
        fullWidth
        size="small"
        label="Search foods"
        placeholder="Type to search…"
        autoComplete="off"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="space-y-2 pt-2 max-h-120 overflow-y-auto pr-1">
        {isLoadingFoods && search.length >= 3 && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="h-6 w-6 rounded-full border-2 border-emerald-400/30 border-t-emerald-400 animate-spin" />
            <p className="text-xs text-slate-400 mt-2">Searching foods...</p>
          </div>
        )}

        {!isLoadingFoods && foods && foods.map((food) => (
          <div
            key={food.id}
            className="rounded-lg border-2 border-emerald-400/40 bg-white/5 p-3"
          >
            <div className="text-sm font-semibold text-slate-200"> {food.name}</div>
            <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-300">
              <div>Kcals: <span className="font-medium text-slate-100">{Math.round(food.calories)}</span></div>
              <div>Prot: <span className="font-medium text-slate-100">{food.protein} g</span></div>
              <div>Carbs: <span className="font-medium text-slate-100">{food.carbohydrates} g</span></div>
              <div>Fat: <span className="font-medium text-slate-100">{food.fat} g</span></div>
              <div 
                role="button" 
                onClick={() => {handleAddFood(food)}} 
                className={`cursor-pointer flex flex-row items-center transition ${
                  addingFoodId === food.id 
                    ? 'text-emerald-500 opacity-50 cursor-not-allowed' 
                    : 'border-emerald-300 text-emerald-300 hover:text-emerald-600'
                }`}
              >
                {addingFoodId === food.id ? (
                  <>
                    <div className="h-3 w-3 rounded-full border border-emerald-400/30 border-t-emerald-400 animate-spin mr-1" />
                    <p>Adding...</p>
                  </>
                ) : (
                  <>
                    <p className="">Add</p>
                    <AddIcon className="" />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {!isLoadingFoods && search.length >= 3 && foods?.length === 0 && (
          <div className="text-xs text-slate-400 text-center py-3">No results. If you want to add your own food, click the add food button</div>
        )}

        {search.length > 0 && search.length < 3 && (
          <div className="text-xs text-slate-400 text-center py-3">Type at least 3 characters to search</div>
        )}
      </div>
    </div>
  );
}