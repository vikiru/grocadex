import axios from 'axios';
import { BASE_URL } from '~constants/Routes';
import { tokenStorage } from '~store';
import { RequestPayload } from '~types';

const axiosInstance = axios.create({
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = tokenStorage.getString('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error(error);
        return Promise.reject(
            new Error('Request failed, invalid access token'),
        );
    },
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const statusCode = error.response?.status;

        if (statusCode === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = tokenStorage.getString('refreshToken');
            if (refreshToken) {
                try {
                    const response = await axiosInstance.post(
                        `${BASE_URL}/auth/refresh`,
                        { refresh_token: refreshToken },
                    );
                    const data = response.data;
                    const { access_token } = data.data;
                    tokenStorage.set('accessToken', access_token);
                    originalRequest.headers['Authorization'] =
                        `Bearer ${access_token}`;
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    console.error('Error refreshing token:', refreshError);
                    tokenStorage.delete('accessToken');
                    tokenStorage.delete('refreshToken');
                    tokenStorage.set('isAuthenticated', false);
                    return Promise.reject(
                        new Error(
                            'Failed to refresh access token, please log in again',
                        ),
                    );
                }
            }
        }
        console.error(error);
        return Promise.reject(new Error('Request failed'));
    },
);

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
        const response = await axiosInstance.get<T>(payload.url);
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
