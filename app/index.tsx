import { Text, View } from 'react-native';

import { NativeWindStyleSheet } from 'nativewind';

NativeWindStyleSheet.setOutput({
    default: 'native',
});

export default function Index() {
    return (
        <View className="bg-green-400 min-h-[100%] min-w-[100%]">
            <View className="flex-row mx-auto mt-10">
                <Text className="text-white text-5xl">Grocery</Text>
                <Text className="text-black text-5xl">Tracker</Text>
            </View>

            <View className="flex-row mx-auto mt-2">
                <Text className="text-white text-xl">A grocery expiry and expense tracker.</Text>
            </View>

            <View className="ml-6 mt-5 lg:mx-auto">
                <Text className="text-black font-bold text-left text-2xl">Track Your Groceries</Text>
                <Text className="text-white text-xl">Never lose track of your grocery expiry dates again!</Text>
            </View>

            <View className="ml-6 mt-5 lg:mx-auto">
                <Text className="text-black font-bold text-left text-2xl">Save Money</Text>
                <Text className="text-white text-xl  max-w-sm">
                    Monitor your monthly expenses with ease and stay on-top of your budgeting goals!
                </Text>
            </View>

            <View className="ml-6 mt-5 lg:mx-auto">
                <Text className="text-black font-bold text-left text-2xl">Reduce Waste</Text>
                <Text className="text-white text-xl">Keep your kitchen waste-free!</Text>
            </View>
        </View>
    );
}
