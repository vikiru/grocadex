import { Text, View } from 'react-native';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory';

import { StyledComponent } from 'nativewind';
import React from 'react';

export default function BarChart({ data, title }: { data: any; title: string }) {
    return (
        <StyledComponent component={View} className="rounded-lg mt-2">
            <StyledComponent component={Text} className="text-center text-text text-lg font-heading">
                {title}
            </StyledComponent>
            <VictoryChart
                height={300}
                width={450}
                theme={VictoryTheme.material}
                domainPadding={{ x: 5 }}
                animate={{ duration: 2000, easing: 'bounce' }}
            >
                <VictoryBar
                    data={data}
                    x="month"
                    y="value"
                    alignment="start"
                    style={{
                        data: { fill: '#4CAF50' },
                    }}
                />
                <VictoryAxis
                    tickFormat={(t) => t}
                    style={{
                        axis: { stroke: '#756f6a' },
                        ticks: { stroke: 'grey', size: 5 },
                        tickLabels: {
                            fontSize: 10,
                            fontFamily: 'Open Sans',
                        },
                        grid: { stroke: 'transparent' },
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={(t) => `$${t}`}
                    style={{
                        axis: { stroke: '#756f6a' },
                        ticks: { stroke: 'grey', size: 5 },
                        tickLabels: {
                            fontSize: 10,
                            textAnchor: 'end',
                            fontFamily: 'Open Sans',
                        },
                        grid: { stroke: 'transparent' },
                    }}
                />
            </VictoryChart>
        </StyledComponent>
    );
}
