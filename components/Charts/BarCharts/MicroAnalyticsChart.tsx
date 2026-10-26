'use client';
import React from 'react';
import styles from './AnalyticsCharts.module.css';
import {
    DetailedMealDTO,
    DetailedCompleteOverviewDTO,
    MicroSummary,
    NutrientCategories,
    NutrientRecommendationDTO,
    MicroNutrientCalculations,
    RecommendationsByNutrient,
} from '@/Types/DetailedTypes';
import {
    Chart,
    Series,
    ArgumentAxis,
    Label,
    Format,
    Legend,
    Tooltip,
    Grid,
    SelectionStyle,
    ValueAxis,
    ConstantLine,
    ConstantLineLabel,

} from 'devextreme-react/chart';
import { PointInfo } from 'devextreme/viz/chart';

interface IMicroAnalyticsChart {
    activePlan: DetailedCompleteOverviewDTO;
    selectedMealId: number | null;
    category: string;
    rdi: RecommendationsByNutrient;
    microCalc: string;
    gender: string;
}

export default function MicroAnalyticsCharts({
    activePlan,
    selectedMealId,
    category,
    microCalc,
    rdi,
    gender,
}: IMicroAnalyticsChart) {
    var filteredSummary: MicroSummary[] = [];
    const chartColor: Record<
        string,
        | 'Green Mist'
        | 'Office'
        | 'Pastel'
        | 'Violet'
        | 'Material'
        | 'Bright'
        | 'Carmine'
        | 'Dark Moon'
        | 'Dark Violet'
        | 'Harmony Light'
    > = {
        WaterSolubleVitamin: 'Green Mist',
        FatSolubleVitamin: 'Office',
        LipidProfile: 'Pastel',
        CarbProfile: 'Violet',
        TraceMineral: 'Bright',
        MacroMineral: 'Material',
        MacroTotals: 'Dark Moon',
        Proximates: 'Carmine',
        Other: 'Harmony Light',
    };


    if (selectedMealId == null) {
        let microSummary = Object.values(activePlan.microSummary);
        if (microSummary.length === 0) {
            return <h1>No data yet</h1>;
        }
        filteredSummary = microSummary.filter(
            (micro) => micro.category === category
        );
    } else {
        let currentMeal = activePlan.detailedMeals.find(
            (meal) => meal.id === selectedMealId
        )!;
        const microSummary = Object.values(currentMeal.microSummary);
        // This prevents the page from crashing when loading a specific meal
        if (microSummary.length === 0) {
            return;
        }
        filteredSummary = microSummary.filter(
            (micro) => micro.category === category
        );
    }

    const microCalculations = () => {
        const age = 32;
        if (microCalc == MicroNutrientCalculations[0]) {
            return filteredSummary;
        } else {
            let result = filteredSummary.map((item) => {
                const rdiItem = rdi[item.nutrientId]?.filter((x) => age >= x.minAge && age <= x.maxAge);
                if ( !rdiItem)
                    return {...item, totalQuantity: null}

                const rec = rdiItem.find((x) => x.gender === gender) ??
                    rdiItem.find((x) => x.gender === "Both");
                if ( rec && rec?.quantity === 0){
                    return {
                        ...item,
                        totalQuantity: 0
                    }
                }
                if (rec && rec?.quantity){
                    const quant = rec.quantity;
                    return {
                        ...item,
                        totalQuantity: Math.round(((item.totalQuantity / quant) * 1000) / 10),
                    };
                }
            });
            return result;
        }
    };

    const customizeText = (currentBar: PointInfo) => {
        var nutrientData = filteredSummary.find((nut) => nut.nutrientId === currentBar.argument);
        var nutrientName = nutrientData?.nutrientName ?? currentBar.argument;
        if (microCalc === "Total"){
            return {
                text: `${nutrientName}: ${currentBar.valueText}${nutrientData?.unit ?? ''}`,
            };
        } else {
            return {
                text: `${nutrientName}: ${currentBar.valueText}%`
            }
        }
    }

    const isPercent = microCalc === MicroNutrientCalculations[1]; // isPercent === "Recommended intake"
  
    return (
        <div>
            <Chart
                id={category}
                dataSource={microCalculations()}
                animation={{ enabled: true, duration: 400 }}
                palette={chartColor[category]}
            >
                <Series
                    valueField="totalQuantity"
                    argumentField="nutrientId"
                    name={category}
                    type="bar"
                >
                    <Label position="top" visible></Label>
                </Series>

                <ValueAxis>
                    {isPercent && (
                        <ConstantLine value={100} extendAxis width={2} dashStyle="dash" color="#0e8b61">
                            <ConstantLineLabel text="100%" position="outside" horizontalAlignment="right" />
                        </ConstantLine>
                    )}

                </ValueAxis>

                <Tooltip
                    enabled={true}
                    location="edge"
                    font={{ size: 14 }}
                    customizeTooltip={customizeText}
                />
                <Legend
                    verticalAlignment="bottom"
                    horizontalAlignment="center"
                    columnCount={3}
                    itemTextPosition="right"
                    font={{ color: '#94a3b8', size: 12, weight: 600 }}
                />
            </Chart>
        </div>
    );
}
