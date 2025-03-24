import axios from 'axios';
import { RequestPayload } from '~types/RequestPayload';

export async function deleteData<T>(
    payload: RequestPayload,
): Promise<T | null> {
    try {
        const response = await axios.delete<T>(`${payload.url}`);
        return response.data;
    } catch (error: any) {
        console.error(
            `An error occurred while deleting data at ${payload.url}.\nError: ${error.message}`,
        );
        return null;
    }
}

export async function getData<T>(payload: RequestPayload): Promise<T | null> {
    try {
        const response = await axios.get<T>(payload.url, {
            headers: {
                Accept: 'application/json',
            },
        });
        return response.data;
    } catch (error: any) {
        console.error(
            `An error occurred while retrieving data at ${payload.url}.\nError: ${error.message}`,
        );
        return null;
    }
}

export async function postData<T>(payload: RequestPayload): Promise<T | null> {
    try {
        const response = await axios.post<T>(payload.url, payload.data, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        return response.data;
    } catch (error: any) {
        console.error(
            `An error occurred while creating data at ${payload.url}.\nError: ${error.message}`,
        );
        return null;
    }
}

export async function putData<T>(payload: RequestPayload): Promise<T | null> {
    try {
        const response = await axios.put<T>(payload.url, payload.data, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        return response.data;
    } catch (error: any) {
        console.error(
            `An error occurred while updating data at ${payload.url}.\nError: ${error.message}`,
        );
        return null;
    }
}
