import { useDispatch, useSelector } from 'react-redux';
import { resetUser, selectUser, setUser } from '../slices/userSlice';

import { User } from '../types/User';

export const useUser = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const updateUser = (user: User) => {
        dispatch(setUser(user));
    };

    const deleteUser = () => {
        dispatch(resetUser());
    };

    return { user, updateUser, deleteUser };
};
