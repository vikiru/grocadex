import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardStack from '~navigation/DashboardStack/DashboardStack';
import ExpiryStack from '~navigation/ExpiryStack/ExpiryStack';
import ReceiptStack from '~navigation/ReceiptStack/ReceiptStack';
import ExpenseScreen from '~screens/ExpenseScreen/ExpenseScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
    return (
        <Drawer.Navigator
            initialRouteName="dashboard"
            screenOptions={{
                headerShown: false,
                drawerLabelStyle: {
                    marginTop: 0,
                    marginLeft: -15,
                },
            }}
        >
            <Drawer.Screen
                name="dashboard"
                component={DashboardStack}
                options={({ route }) => ({
                    title: 'Home',
                    headerShown: true,
                    drawerIcon: () => <MaterialCommunityIcons name="home" size={24} />,
                })}
            />
            <Drawer.Screen
                name="expiry"
                component={ExpiryStack}
                options={{
                    title: 'Expiring Groceries',
                    headerShown: true,
                    drawerIcon: () => <MaterialCommunityIcons name="calendar" size={24} />,
                }}
            />
            <Drawer.Screen
                name="expense"
                component={ExpenseScreen}
                options={{
                    title: 'View Expenses',
                    headerShown: true,
                    drawerIcon: () => <MaterialCommunityIcons name="cash" size={26} />,
                }}
            />
            <Drawer.Screen
                name="receipt"
                component={ReceiptStack}
                options={{
                    title: 'View Receipts',
                    headerShown: false,
                    drawerIcon: () => <MaterialCommunityIcons name="receipt" size={24} />,
                }}
            />
        </Drawer.Navigator>
    );
}
