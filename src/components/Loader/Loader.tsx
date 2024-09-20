import { StyledComponent } from 'nativewind';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

type LoaderProps = {
    loading: boolean;
};

export default function Loader({ loading }: LoaderProps) {
    return (
        <StyledComponent component={View} className="flex-1 items-center justify-center">
            <ActivityIndicator animating={loading} color="green" size="large" />
        </StyledComponent>
    );
}
