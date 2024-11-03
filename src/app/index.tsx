import { useUser } from '~hooks/redux/useUser';
import DashboardScreen from '~screens/DashboardScreen/DashboardScreen';
import SplashScreen from '~screens/SplashScreen/SplashScreen';

export default function Index() {
    const { user } = useUser();
    console.log(user);
    return user ? <DashboardScreen /> : <SplashScreen />;
}
