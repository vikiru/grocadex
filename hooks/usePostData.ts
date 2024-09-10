import axios from 'axios';
import React from 'react';
import { RequestPayload } from '../types/RequestPayload';

export function usePostData() {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);

    const postData = async (payload: RequestPayload) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(payload.url, payload.data);
            console.log(response);
            return response;
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { postData, loading, error };
}

export default usePostData;
