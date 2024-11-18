import { useUser } from '~hooks/redux';
import AuthStack from '~navigation/AuthStack/AuthStack';
import DrawerNavigation from '~navigation/DrawerNavigation/DrawerNavigation';

export default function MainNavigation() {
    const { user } = useUser();
    if (user) {
        return <DrawerNavigation />;
    } else {
        return <AuthStack />;
    }
}
