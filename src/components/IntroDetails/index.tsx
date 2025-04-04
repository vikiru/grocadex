import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

type IntroDetailsProps = {
    heading: string;
    subtext: string;
    icon: any;
};

export default function IntroDetails(props: IntroDetailsProps) {
    return (
        <View className="mx-auto my-2 flex flex-row items-center">
            <View className="flex h-16 w-16 max-w-[20%] items-center justify-center">
                <MaterialCommunityIcons
                    className="mx-3 text-typography-950"
                    name={props.icon}
                    size={40}
                />
            </View>
            <View className="ml-4 flex flex-col xs:max-w-[300px] md:max-w-[400px] xl:max-w-[600px] 4xl:max-w-[800px]">
                <Text className="font-heading font-bold text-typography-950 xs:text-xl lg:text-2xl">
                    {props.heading}
                </Text>
                <View className="mr-5 flex">
                    <Text className="p mr-2 mt-1 text-left font-body text-typography-700">
                        {props.subtext}
                    </Text>
                </View>
            </View>
        </View>
    );
}
