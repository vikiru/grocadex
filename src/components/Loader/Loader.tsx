import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

type LoaderProps = {
    loading: boolean;
};

export default function Loader({ loading }: LoaderProps) {
    return (
        <View className="flex-1 items-center justify-center">
            <ActivityIndicator animating={loading} color="green" size="large" />
        </View>
    );
}
