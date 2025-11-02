"use client";
import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { AddFoodDTO, FoodDTO } from "@/Types/types";
import { fetchPost } from "@/Fetch/fetchPost";
import { SweetAlertCustomFoodAdded } from "@/components/SweetAlert/Success";
import { SweetAlertWarning } from "@/components/SweetAlert/warning";

export function CreateCustomFood() {
    // Create a useState with addCustomFood object type here
    const [customFoodToCreate, setCustomFoodToCreate] = useState({
        name: "",
        calories: "0",
        protein: "0",
        carbohydrates: "0",
        fat: "0",
    });
    const [isExpanded, setIsExpanded] = useState(false);

    async function handleCustomFood(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const foodToAddDTO: AddFoodDTO = {
            name: data.Name as string,
            calories: Number(data.Calories),
            protein: Number(data.Protein),
            carbohydrates: Number(data.Carbs),
            fat: Number(data.Fat),
        };
        if (customFoodToCreate.name.length < 3 ) {
            SweetAlertWarning("Food name must be at least 3 characters long.");
            return;
        } else if ( isNaN(foodToAddDTO.calories) || isNaN(foodToAddDTO.protein) || isNaN(foodToAddDTO.carbohydrates) || isNaN(foodToAddDTO.fat) ) {
            SweetAlertWarning("Nutritional values must be valid numbers.");
            return;
        } else if ( foodToAddDTO.calories < 0 || foodToAddDTO.protein < 0 || foodToAddDTO.carbohydrates < 0 || foodToAddDTO.fat < 0 ) {
                SweetAlertWarning("Nutritional values cannot be negative.");
            return;
        } else {
            console.log("Submitting custom food: ", foodToAddDTO);
            const res = await fetchPost<FoodDTO, AddFoodDTO>("/api/Foods/Create", foodToAddDTO);

            if ( res.success ){
                console.log(res.data);
                SweetAlertCustomFoodAdded(res.data);
                setCustomFoodToCreate({name: "", calories: "0", protein: "0", carbohydrates: "0", fat: "0"});
            } else {
                SweetAlertWarning(res.error.message.Error[0]);
            }
        }
    }

    return (
        <div className="border rounded-lg p-3">
            <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <h3 className="text-sm font-medium">Add Custom Food</h3>
                {isExpanded ? <ExpandLess /> : <ExpandMore />}
            </div>
            
            <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
                <form onSubmit={handleCustomFood} className="flex flex-col gap-2 mt-4">
                    <TextField required label="Name" size="small" variant="outlined" type="text" name="Name" value={customFoodToCreate.name} onChange={(e) => setCustomFoodToCreate({ ...customFoodToCreate, name: e.target.value })} />
                    <TextField required label="Calories" size="small" variant="outlined" name="Calories" placeholder="Calories per 100g" value={customFoodToCreate.calories} onChange={(e) => setCustomFoodToCreate({ ...customFoodToCreate, calories: e.target.value})} />
                    <TextField required label="Protein" size="small" variant="outlined" name="Protein" placeholder="Protein per 100g" value={customFoodToCreate.protein} onChange={(e) => setCustomFoodToCreate({ ...customFoodToCreate, protein: e.target.value})} />
                    <TextField required label="Carbs" size="small" variant="outlined" name="Carbs" placeholder="Carbs per 100g" value={customFoodToCreate.carbohydrates} onChange={(e) => setCustomFoodToCreate({ ...customFoodToCreate, carbohydrates: e.target.value})} />
                    <TextField required label="Fat" size="small" variant="outlined" name="Fat" placeholder="Fat per 100g" value={customFoodToCreate.fat} onChange={(e) => setCustomFoodToCreate({ ...customFoodToCreate, fat: e.target.value})} />
                    <Button variant="contained" type="submit">Add Custom Food</Button>
                </form>
            </div>
        </div>
    );
}