import { Platform, ScrollView } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { DataTable } from '~components';
import { Heading, HStack, Text, VStack } from '~components/ui';
import { DateFormat } from '~constants/Dates';
import { useGraphData } from '~hooks';

let BarChart: any;

if (Platform.OS === 'web') {
    BarChart = require('react-gifted-charts').BarChart;
} else {
    BarChart = require('react-native-gifted-charts').BarChart;
}

export default function ExpenseViewScreen() {
    const { width, height } = useWindowDimensions();
    const { graphData } = useGraphData();

    return (
        <ScrollView className="min-h-screen bg-background-100">
            <HStack className="mx-4 mt-2">
                <Heading className="font-heading xs:text-2xl xl:text-3xl">
                    Overview for 2024
                </Heading>
            </HStack>
            <HStack className="mx-4 mt-2">
                <BarChart
                    data={graphData}
                    frontColor="lightgrey"
                    height={height * 0.25}
                    hideRule
                    initialSpacing={1}
                    isAnimated
                    renderTooltip={(item: any) => (
                        <VStack
                            style={{
                                marginBottom: width > 768 ? 20 : 0,
                                paddingHorizontal: 10,
                                paddingVertical: 4,
                                borderRadius: 4,
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.2,
                                shadowRadius: 4,
                                elevation: 3,
                            }}
                        >
                            <Text className="bg-background-100 px-2 font-info shadow-sm">
                                ${Number(item.value).toFixed(2)}
                            </Text>
                        </VStack>
                    )}
                    width={width * 0.8}
                />
            </HStack>

            <DataTable
                data={graphData}
                dataKeys={[
                    { format: 'string', key: 'label' },
                    { format: 'numeric', key: 'value' },
                ]}
                dateFormat={DateFormat}
                headers={['Date', 'Total']}
                pageSize={height >= 1280 ? 4 : 2}
            />
        </ScrollView>
    );
}
