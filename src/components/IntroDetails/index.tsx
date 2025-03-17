import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

type IntroDetailsProps = {
    heading: string;
    subtext: string;
    icon: any;
};

function IntroDetails(props: IntroDetailsProps) {
    return (
        <View className="mx-auto my-2 flex flex-row items-center">
            <View className="flex h-16 w-16 max-w-[20%] items-center justify-center">
                <MaterialCommunityIcons
                    className="mx-3 text-light-text-950 dark:text-dark-text-950"
                    name={props.icon}
                    size={40}
                />
            </View>
            <View className="ml-4 flex max-w-[300px] flex-col lg:max-w-[400px]">
                <Text className="font-heading text-h5 font-bold text-light-text-950 dark:text-dark-text-950">
                    {props.heading}
                </Text>
                <View className="mr-5 flex">
                    <Text className="font-body mr-2 mt-1 text-left text-h6 text-light-text-950 dark:text-dark-text-950">
                        {props.subtext}
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default IntroDetails;
