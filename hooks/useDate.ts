import { useDispatch, useSelector } from 'react-redux';
import { selectDate, setDate, updateDate } from '../slices/dateSlice';

export const useDate = () => {
    const date = useSelector(selectDate);
    const dispatch = useDispatch();

    const setDateValues = (date: Date) => {
        dispatch(setDate(date));
    };

    const updateDateValues = () => {
        dispatch(updateDate());
    };

    return { date, setDateValues, updateDateValues };
};
