import { Text, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

type IntroDetailsProps = {
    heading: string;
    subtext: string;
    icon: any;
};

export default function IntroDetails(props: IntroDetailsProps) {
    return (
        <View className="my-2 flex flex-row items-center">
            <View className="flex h-16 w-16 max-w-[20%] items-center justify-center">
                <MaterialCommunityIcons
                    className="ml-3"
                    color="black"
                    name={props.icon}
                    size={40}
                />
            </View>
            <View className="ml-4 flex max-w-[300px] flex-col">
                <Text className="font-merriweather text-left text-lg font-semibold text-text">
                    {props.heading}
                </Text>
                <View className="mr-5 flex">
                    <Text className="text-md mr-2 mt-1 text-left font-body text-text">
                        {props.subtext}
                    </Text>
                </View>
            </View>
        </View>
    );
}
