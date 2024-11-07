import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReceiptCreateScreen from '~screens/ReceiptCreateScreen/ReceiptCreateScreen';
import ReceiptEditScreen from '~screens/ReceiptEditScreen/ReceiptEditScreen';
import ReceiptViewScreen from '~screens/ReceiptViewScreen/ReceiptViewScreen';
import ReceiptsScreen from '~screens/ReceiptsScreen/ReceiptScreen';

const Stack = createNativeStackNavigator();

export default function ReceiptStack() {
    const navigation = useNavigation();
    return (
        <Stack.Navigator initialRouteName="receipts">
            <Stack.Screen
                name="receipts"
                component={ReceiptsScreen}
                options={{
                    headerShown: true,
                    title: 'Receipts',
                    headerLeft: () => (
                        <MaterialCommunityIcons
                            name="menu"
                            size={24}
                            style={{ paddingRight: 20 }}
                            onPress={() => navigation.openDrawer()}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="receipts/view"
                component={ReceiptViewScreen}
                options={{ headerShown: true, title: 'View Receipt' }}
            />
            <Stack.Screen
                name="receipts/edit"
                component={ReceiptEditScreen}
                options={{ headerShown: true, title: 'Edit Receipt' }}
            />
            <Stack.Screen
                name="receipts/create"
                component={ReceiptCreateScreen}
                options={{ headerShown: true, title: 'Create Receipt' }}
            />
        </Stack.Navigator>
    );
}
