import axios from 'axios';
import React from 'react';
import { RequestPayload } from '../types/RequestPayload';

export function usePostData(url: string, payload = {}) {
    const [data, setData] = React.useState(payload);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);

    const postData = async (payload: RequestPayload) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(url, payload.data);
            setData(response);
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { postData, isLoading, error, data };
}

export default usePostData;
