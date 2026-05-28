import React from "react";
import { Series, ArgumentAxis, ValueAxis, Label, Format, Legend, Tooltip,Grid } from 'devextreme-react/chart';
import {PieChart, Connector} from "devextreme-react/pie-chart";
import { DetailedCompleteOverviewDTO } from "@/Types/DetailedTypes";

interface overviewSource {
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
}

export default function MacroPieChart({overviewDTO}: {overviewDTO: overviewSource}) {

    const totalSum = overviewDTO.totalProtein + overviewDTO.totalCarbs + overviewDTO.totalFats; 

    const dataListPercent = [
        {name: "Protein", percent: parseInt(((overviewDTO.totalProtein / totalSum) * 100).toFixed(1))},
        {name: "Carbs", percent: parseInt(((overviewDTO.totalCarbs / totalSum) * 100).toFixed(1))},
        {name: "Fats", percent: parseInt(((overviewDTO.totalFats / totalSum) * 100).toFixed(1))}
    ]

    return (
        <div>
            <PieChart
                id="MacroPieChart"
                dataSource={dataListPercent}
                animation={{enabled: true, duration: 400}}
                palette={"Material"}
                type="doughnut"
                innerRadius={0.5}
                >
                <Series
                    valueField="percent"
                    argumentField="name"
                    >
                    <Label 
                        visible={true} 
                        backgroundColor="transparent"
                        customizeText={(data) => {
                        return `${data.argument}\n${data.value}%`;
                        }}
                        >
                        <Connector visible={true} width={1} color="#475569" />
                    </Label>
                </Series>
                <Legend 
                    verticalAlignment="bottom" 
                    horizontalAlignment="center"
                    columnCount={3}
                    itemTextPosition="right"
                    font={{ color: "#94a3b8", size: 12 }} 
                    />
            </PieChart>
        </div>
    )
}