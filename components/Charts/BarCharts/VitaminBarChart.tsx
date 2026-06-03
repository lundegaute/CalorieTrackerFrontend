"use client";
import React from "react";
import { DetailedMealDTO, DetailedCompleteOverviewDTO, MicroSummary } from "@/Types/DetailedTypes";
import { Chart, Series, ArgumentAxis, ValueAxis, Label, Format, Legend, Tooltip,Grid, SelectionStyle } from "devextreme-react/chart";



export default function VitaminBarChart({activePlan, selectedMealId}: {activePlan: DetailedCompleteOverviewDTO, selectedMealId: number | null}) {

    // MealPlan#1 ->    Middag     -> Havregryn 120g -> Havregryn 100g -> 
    // ActivePlan -> currentMeal -> mealComponents -> detailedFood   -> foodConstituents
    var vitaminSummary: MicroSummary[] = [];
    if ( selectedMealId !== null) {
        var currentMeal = activePlan.detailedMeals.find(meal => meal.id === selectedMealId)!
        const microSummary = Object.values(currentMeal.microSummary);
        vitaminSummary = microSummary.filter(micro => micro.nutrientId.includes("Vit"));
    }
    else {
        var microSummary = Object.values(activePlan.microSummary);
        vitaminSummary = microSummary.filter(micro => micro.nutrientId.includes("Vit"));
    }
    


    return (
        <div>
            <Chart 
                id="vitaminBarChart"
                dataSource={vitaminSummary}
                animation={{enabled: true, duration: 500}}
                palette={"Material"}
                >
                <Series 
                    valueField="totalQuantity"
                    argumentField="nutrientId"
                    name="Vitamins"
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