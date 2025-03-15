import { LinearGradient, useFont, vec } from '@shopify/react-native-skia';
import { Text, View } from 'react-native';
import { Bar, CartesianChart } from 'victory-native';

import { DateTime } from 'luxon';
import React from 'react';
import Baloo from '~fonts/Baloo2-VariableFont_wght.ttf';

export default function BarChart({
    data,
}: {
    data: { label: string; amount: number }[];
}) {
    const font = useFont(Baloo, 12);
    const year = DateTime.now().year;

    return (
        <View className="mx-4 mt-2 rounded-md px-2 shadow-lg">
            <Text className="mb-1 text-center font-heading text-base font-semibold text-text">
                Yearly Expenses for {year}
            </Text>
            <View className="h-52 w-full">
                <CartesianChart
                    data={data}
                    xKey="label"
                    yKeys={['amount']}
                    domainPadding={{ left: 0, right: 20, top: 30 }}
                    axisOptions={{
                        font,
                        tickCount: {
                            x: 12,
                            y: 10,
                        },
                    }}
                >
                    {({ points, chartBounds }) => (
                        <Bar
                            chartBounds={chartBounds}
                            points={points.amount}
                            roundedCorners={{
                                topLeft: 5,
                                topRight: 5,
                            }}
                        >
                            <LinearGradient
                                colors={['#a78bfa', '#a78bfa50']}
                                end={vec(0, 400)}
                                start={vec(0, 0)}
                            />
                        </Bar>
                    )}
                </CartesianChart>
            </View>
        </View>
    );
}
