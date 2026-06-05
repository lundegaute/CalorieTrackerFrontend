"use client";
import React from "react";
import styles from "./AnalyticsCharts.module.css";
import { DetailedMealDTO, DetailedCompleteOverviewDTO, MicroSummary, NutrientCategories } from "@/Types/DetailedTypes";
import { Chart, Series, ArgumentAxis, ValueAxis, Label, Format, Legend, Tooltip,Grid, SelectionStyle } from "devextreme-react/chart";

interface IMicroAnalyticsChart {
    activePlan: DetailedCompleteOverviewDTO;
    selectedMealId: number | null;
    category: string;
    //groupOn: keyof MicroSummary; // For further development grouping charts on category or unit(grams, miligrams) or Quantity
}

export default function MicroAnalyticsCharts({activePlan, selectedMealId, category }: IMicroAnalyticsChart) {
    var filteredSummary: MicroSummary[] = [];
    const chartColor: Record<string, "Green Mist" | "Office" | "Pastel" | "Violet" | "Material" | "Bright" | "Carmine" | "Dark Moon" | "Dark Violet" | "Harmony Light"> = {
    "WaterSolubleVitamin": "Green Mist",
    "FatSolubleVitamin": "Office",
    "LipidProfile": "Pastel",
    "CarbProfile": "Violet",
    "TraceMineral": "Bright",
    "MacroMineral": "Material",
    "MacroTotals": "Dark Moon",
};


    // If 
    if ( selectedMealId == null) {
        var microSummary = Object.values(activePlan.microSummary);
    
        filteredSummary = microSummary.filter(micro => micro.category == category);
    } 
    else {
        var currentMeal = activePlan.detailedMeals.find(meal => meal.id === selectedMealId)!
        const microSummary = Object.values(currentMeal.microSummary);
    
        filteredSummary = microSummary.filter(micro => micro.category == category);
    }
    

    return (
        <div>
            {}
            <Chart 
                id={category}
                dataSource={filteredSummary}
                animation={{enabled: true, duration: 500}}
                palette={chartColor[category]}
                >
                <Series 
                    valueField="totalQuantity"
                    argumentField="nutrientId"
                    name={filteredSummary[0].category} // How do i move this around?
                    type="bar"
                    >
                    <Label
                        position="top"
                        visible                     
                        >
                    </Label>           
                </Series>
                <Tooltip 
                    enabled={true}
                    location="edge"
                    font={{ size: 14 }}
                    customizeTooltip={currentBar => {
                        var nutrientData = filteredSummary.find(nut => nut.nutrientId === currentBar.argument);
                        var nutrientName = nutrientData?.nutrientName ?? currentBar.argument;
                        return {
                            text: `${nutrientName}`
                        }
                    }}
                /> 
                <Legend 
                    verticalAlignment="bottom" 
                    horizontalAlignment="center"
                    columnCount={3}
                    itemTextPosition="right"
                    font={{ color: "#94a3b8", size: 12 , weight: 600}} 
                />
            </Chart>
        
        </div>
    )
}