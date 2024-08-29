import axios from 'axios';
import React from 'react';
import { RequestPayload } from '../types/RequestPayload';

export function usePutData(url: string) {
    const [data, setData] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);

    const putData = async (payload: RequestPayload) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.put(url, payload.data);
            setData(response);
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { putData, isLoading, error, data };
}

export default usePutData;
