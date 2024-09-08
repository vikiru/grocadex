import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryTheme } from 'victory';

import { StyledComponent } from 'nativewind';
import React from 'react';
import { View } from 'react-native';

export default function BarChart({ data, title }: { data: any; title: string }) {
    return (
        <StyledComponent component={View} className="rounded-lg mt-2">
            <VictoryChart
                height={300}
                width={450}
                theme={VictoryTheme.material}
                domainPadding={{ x: 5 }}
                animate={{ duration: 2000, easing: 'bounce' }}
            >
                <VictoryLabel
                    text={title}
                    x={235}
                    y={20}
                    textAnchor="middle"
                    style={{ fontFamily: 'Baloo 2', fontSize: 16 }}
                />
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
