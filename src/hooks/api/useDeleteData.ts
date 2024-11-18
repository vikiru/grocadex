import axios from 'axios';
import React from 'react';
import { RequestPayload } from '~types/index';

export default function useDeleteData() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);

    const deleteData = async (payload: RequestPayload) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.delete(`${payload.url}`);
            return response;
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { deleteData, isLoading, error };
}
