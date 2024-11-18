import { AuthStack, DrawerNavigation } from '~navigation/index';

import { useUser } from '~hooks/redux';

export default function MainNavigation() {
    const { user } = useUser();
    if (user) {
        return <DrawerNavigation />;
    } else {
        return <AuthStack />;
    }
}
