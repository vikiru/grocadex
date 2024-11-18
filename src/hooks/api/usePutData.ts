import axios from 'axios';
import React from 'react';
import { RequestPayload } from '~types/index';

export default function usePutData() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);

    const putData = async (payload: RequestPayload) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.put(payload.url, payload.data);
            return response;
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { putData, isLoading, error };
}
