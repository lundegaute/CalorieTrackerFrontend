"use client";
import React from "react";
import { DetailedMealDTO } from "@/Types/DetailedTypes";
import { Chart, Series, ArgumentAxis, ValueAxis, Label, Format, Legend, Tooltip,Grid, SelectionStyle } from "devextreme-react/chart";


export default function VitaminBarChart({currentMeal}: {currentMeal: DetailedMealDTO}) {

    // MealPlan#1 ->    Middag     -> Havregryn 120g -> Havregryn 100g -> 
    // ActivePlan -> currentMeal -> mealComponents -> detailedFood   -> foodConstituents

    const mealVitamins = currentMeal.components.forEach((foodItem) => {
        foodItem.detailedFood.foodName
    });

    const vitamins = currentMeal.components[0].detailedFood.constituents
        .filter(micro => micro.nutrientId.includes("Vit"));

    return (
        <div>
            <Chart 
                id="vitaminBarChart"
                dataSource={vitamins}
                animation={{enabled: true, duration: 500}}
                title={"Vitamin Intake"}
                palette={"Material"}
                >
                <Series 
                    valueField="quantity"
                    argumentField="nutrient.nutrientName"
                    name="nutrient.nutrientName"
                    type="bar"
                    >
                    <Label
                        position="top"
                        visible                     
                        >
                    </Label>           
                </Series>
            
            </Chart>
        
        </div>
    )
}