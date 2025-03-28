import axios from 'axios';
import { RequestPayload } from '~types/RequestPayload';

//TODO: fix dashboard/api issues. cannot seem to use auth requests. user undefined/cookies not set

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3000',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export async function deleteData<T>(
    payload: RequestPayload,
): Promise<T | null> {
    try {
        const response = await axiosInstance.delete<T>(payload.url);
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
        const response = await axiosInstance.get<T>(payload.url, {
            params: payload.data,
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
        const response = await axiosInstance.post<T>(payload.url, payload.data);
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
        const response = await axiosInstance.put<T>(payload.url, payload.data);
        return response.data;
    } catch (error: any) {
        console.error(
            `An error occurred while updating data at ${payload.url}.\nError: ${error.message}`,
        );
        return null;
    }
}
