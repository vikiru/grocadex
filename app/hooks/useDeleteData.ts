import axios from 'axios';
import React from 'react';
import { RequestPayload } from '../types/RequestPayload';

export function useDeleteData(url: string, payload = {}) {
    const [data, setData] = React.useState(payload);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);

    const deleteData = async (payload: RequestPayload) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.delete(`${url}/${payload.id}`);
            setData(response);
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { deleteData, isLoading, error, data };
}

export default useDeleteData;
