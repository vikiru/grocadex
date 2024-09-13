import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLine, VictoryTheme } from 'victory';

import { StyledComponent } from 'nativewind';
import React from 'react';
import { View } from 'react-native';

const data = [
    { month: 'Jan', value: 100 },
    { month: 'Feb', value: 200 },
    { month: 'Mar', value: 300 },
    { month: 'Apr', value: 400 },
    { month: 'May', value: 500 },
    { month: 'Jun', value: 600 },
    { month: 'Jul', value: 700 },
    { month: 'Aug', value: 800 },
    { month: 'Sep', value: 900 },
    { month: 'Oct', value: 1000 },
    { month: 'Nov', value: 1100 },
    { month: 'Dec', value: 1200 },
];

export default function LineGraph() {
    return (
        <StyledComponent
            component={View}
            className="flex justify-startml-2 h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]"
        >
            <VictoryChart height={200} theme={VictoryTheme.material}>
                <VictoryLabel text="Yearly Expenses" y={20} x={180} textAnchor="middle" />
                <VictoryLine data={data} x="month" y="value" />
                <VictoryAxis
                    tickFormat={(t) => t}
                    style={{
                        grid: { stroke: 'transparent' },
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={(t) => `$${t}`}
                    style={{
                        grid: { stroke: 'transparent' },
                    }}
                />
            </VictoryChart>
        </StyledComponent>
    );
}
