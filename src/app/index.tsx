import { useRouter } from 'expo-router';
import { useUser } from '~hooks/redux/useUser';
import SplashScreen from '~screens/SplashScreen/SplashScreen';

export default function Index() {
    const { user } = useUser();
    const router = useRouter();
    return <SplashScreen />;
}
