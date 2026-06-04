"use client";
import React from "react";
import styles from "./AnalyticsCharts.module.css";
import { DetailedMealDTO, DetailedCompleteOverviewDTO, MicroSummary, NutrientCategories } from "@/Types/DetailedTypes";
import { Chart, Series, ArgumentAxis, ValueAxis, Label, Format, Legend, Tooltip,Grid, SelectionStyle } from "devextreme-react/chart";

interface IMicroAnalyticsChart {
    activePlan: DetailedCompleteOverviewDTO;
    selectedMealId: number | null;
    category: string;
    label: string;
}

export default function MicroAnalyticsCharts({activePlan, selectedMealId, category, label}: IMicroAnalyticsChart) {
    var categoryBasedSummary: MicroSummary[] = [];
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
    
        categoryBasedSummary = microSummary.filter(micro => micro.category == category);
    } 
    else {
        var currentMeal = activePlan.detailedMeals.find(meal => meal.id === selectedMealId)!
        const microSummary = Object.values(currentMeal.microSummary);
    
        categoryBasedSummary = microSummary.filter(micro => micro.category == category);
    }
    


    return (
        <div>
            <div className={styles.outlineLabel}>{label}</div>
            {}
            <Chart 
                id={category}
                dataSource={categoryBasedSummary}
                animation={{enabled: true, duration: 500}}
                palette={chartColor[category]}
                >
                <Series 
                    valueField="totalQuantity"
                    argumentField="nutrientId"
                    name={categoryBasedSummary[0].category} // How do i move this around?
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
                    shared={false}
                    location="edge"
                    font={{ size: 14 }}
                    border={{ visible: true, color: "#64748b", width: 1 }}
                    customizeTooltip={currentBar => {
                        var nutrientData = categoryBasedSummary.find(nut => nut.nutrientId === currentBar.argument);
                        var nutrientName = nutrientData?.nutrientName ?? currentBar.argument;
                        return {
                            text: `${nutrientName}`
                        }
                    }}
                    
                /> 
                <Legend 
                    verticalAlignment="bottom" 
                    horizontalAlignment="center"
                    title={"Chart Headline"}
                    columnCount={3}
                    itemTextPosition="right"
                    font={{ color: "#94a3b8", size: 12 }} 
                />
            </Chart>
        
        </div>
    )
}