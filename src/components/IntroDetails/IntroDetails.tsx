import { Text, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

type IntroDetailsProps = {
    heading: string;
    subtext: string;
    icon: any;
};

export default function IntroDetails(props: IntroDetailsProps) {
    return (
        <View className="flex flex-row items-center my-2">
            <View className="flex items-center justify-center h-16 w-16 max-w-[20%]">
                <MaterialCommunityIcons name={props.icon} size={40} color="black" className="ml-3" />
            </View>
            <View className="ml-4 flex flex-col max-w-[300px]">
                <Text className="text-text font-semibold text-left text-lg font-merriweather">{props.heading}</Text>
                <View className="mr-5 flex">
                    <Text className="text-text text-left text-md mt-1 font-body mr-2">{props.subtext}</Text>
                </View>
            </View>
        </View>
    );
}
