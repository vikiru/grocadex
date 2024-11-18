import axios from 'axios';
import React from 'react';
import { RequestPayload } from '~types/index';

export default function useGetData() {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);

    const getData = async (payload: RequestPayload) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(payload.url);
            return response;
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { getData, loading, error };
}
