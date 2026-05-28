"use client";
import React from "react";
import { DetailedCompleteOverviewDTO } from "@/Types/DetailedTypes";
import { Chart, Series, ArgumentAxis, ValueAxis, Label, Format, Legend, Tooltip,Grid, SelectionStyle } from "devextreme-react/chart";

export default function MacroBarChart({dataSource}: {dataSource:DetailedCompleteOverviewDTO}) {


    return (
        <div>
            <Chart
                id="MacroBarChart"
                dataSource={[dataSource]}
                palette="Material"
                animation={{enabled: true, duration: 600}}
                >
                <Series 
                    valueField="totalProtein"
                    argumentField="name"
                    name="Protein"
                    type="bar"
                    >
                        <Label
                            position="top"
                            visible                     
                            >
                        </Label>
                </Series>
                <Series 
                    valueField="totalCarbs"
                    argumentField="name"
                    name="Carbs"
                    type="bar"
                    >
                        <Label
                            position="top"
                            visible                        
                            >
                        </Label>
                </Series>
                <Series 
                    valueField="totalFats"
                    argumentField="name"
                    name="Fats"
                    type="bar"
                    >
                        <Label
                            position="top"
                            visible                        
                            >
                        </Label>
                </Series>
                <ArgumentAxis >
                    <Label font={{ color: "#94a3b8", weight: 600 }} />
                </ArgumentAxis>
                <ValueAxis>
                    <Label font={{ color: "#64748b" }} />
                    <Grid visible={true} color="rgba(71, 85, 105, 0.15)" />
                </ValueAxis>
                <Legend 
                    verticalAlignment="top"
                    horizontalAlignment="center"
                    
                />
            </Chart> 

        </div>
        
    )
}