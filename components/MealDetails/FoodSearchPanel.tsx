"use client";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { FoodFromMongo, FoodFromSql, ErrorResponse, AddFoodDTO, AddMealDTO, MealDTO, FoodDTO} from "@/Types/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {fetchPost} from "@/Fetch/fetchPost";
import {fetchGet} from "@/Fetch/fetchGet";

// Ctrl+Shift+F to search for sweetalert2, to see where to add it throughout the project

export default function FoodSearchPanel({mealId}: {mealId: number}) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const { data: foods, isLoading: isLoadingFoods, error, refetch: refetchFoods } = useQuery<FoodFromSql[], ErrorResponse>({
    queryKey: ["foodsFromSql", search],
    queryFn: async () => {
      const res = await fetchPost<FoodFromSql[], string>("/api/Foods/Search", search);
      if (!res.success) throw res.error;
      return res.data;
    },
    enabled: search.length >= 3,
    retry: 0, 
  });


  async function handleAddFood(food: FoodFromSql) {
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
        {foods && foods.map((food) => (
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
              <div role="button" onClick={() => {handleAddFood(food)}} className="cursor-pointer flex flex-row items-center border-emerald-300 text-emerald-300  hover:text-emerald-600  transition ">
                <p className="">Add</p>
                <AddIcon className="" />
              </div>
            </div>
          </div>
        ))}

        {search.length >= 3 && foods?.length === 0 && (
          <div className="text-xs text-slate-400 text-center py-3">No results</div>
        )}
      </div>
    </div>
  );
}