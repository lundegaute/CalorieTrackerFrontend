import React from 'react';
import {
    Series,
    ArgumentAxis,
    ValueAxis,
    Label,
    Format,
    Legend,
    Tooltip,
    Grid,
} from 'devextreme-react/chart';
import PieChart, { Connector, type PieChartTypes } from 'devextreme-react/pie-chart';
    
interface overviewSource {
    totalProtein: number;
    totalCarbs: number;
    totalFats: number;
}

export default function MacroPieChart({
    overviewDTO,
    macroDistribution
}: {
    overviewDTO: overviewSource;
    macroDistribution: string;
}) {
    const totalSum =
        overviewDTO.totalProtein +
        overviewDTO.totalCarbs +
        overviewDTO.totalFats;
    const totalEnergy =
        (overviewDTO.totalProtein * 4) +
        (overviewDTO.totalCarbs * 4) +
        (overviewDTO.totalFats * 9);

    const dataListPercent = [
        {
            name: 'Protein',
            percent: parseInt(
                ((overviewDTO.totalProtein / totalSum) * 100).toFixed(1)
            ),
        },
        {
            name: 'Carbs',
            percent: parseInt(
                ((overviewDTO.totalCarbs / totalSum) * 100).toFixed(1)
            ),
        },
        {
            name: 'Fats',
            percent: parseInt(
                ((overviewDTO.totalFats / totalSum) * 100).toFixed(1)
            ),
        },
    ];
    const dataListPercentBasedOnEnergy = [
        {
            name: 'Protein',
            percent: parseInt(
                (((overviewDTO.totalProtein * 4) / totalEnergy) * 100).toFixed(1)
            ),
        },
        {
            name: 'Carbs',
            percent: parseInt(
                (((overviewDTO.totalCarbs * 4) / totalEnergy) * 100).toFixed(1)
            ),
        },
        {
            name: 'Fats',
            percent: parseInt(
                (((overviewDTO.totalFats * 9) / totalEnergy) * 100).toFixed(1)
            ),
        },
    ];

    return (
        <div>
            <PieChart
                id="MacroPieChart"
                dataSource={macroDistribution === "Grams" ? dataListPercent : dataListPercentBasedOnEnergy}
                animation={{ enabled: true, duration: 600 }}
                palette={'Material'}
                type="doughnut"
                innerRadius={0.5}
            >
                <Series valueField="percent" argumentField="name">
                    <Label
                        visible={true}
                        backgroundColor="transparent"
                        customizeText={(pointInfo: PieChartTypes.PointInfo)  => {
                            return `${pointInfo.argument}\n${pointInfo.value}%`;
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
                    font={{ color: '#94a3b8', size: 12 }}
                />
            </PieChart>
        </div>
    );
}
