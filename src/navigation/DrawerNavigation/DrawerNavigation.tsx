import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '~screens/DashboardScreen/DashboardScreen';
import ExpenseScreen from '~screens/ExpenseScreen/ExpenseScreen';
import ExpiryScreen from '~screens/ExpiryScreen/ExpiryScreen';
import ReceiptsScreen from '~screens/ReceiptsScreen/ReceiptScreen';

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
                component={DashboardScreen}
                options={{
                    title: 'Home',
                    headerShown: true,
                    drawerIcon: () => <MaterialCommunityIcons name="home" size={24} />,
                }}
            />
            <Drawer.Screen
                name="expiry"
                component={ExpiryScreen}
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
                component={ReceiptsScreen}
                options={{
                    title: 'View Receipts',
                    headerShown: true,
                    drawerIcon: () => <MaterialCommunityIcons name="receipt" size={24} />,
                }}
            />
        </Drawer.Navigator>
    );
}
