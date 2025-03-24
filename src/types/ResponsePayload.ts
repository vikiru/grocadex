import { ResponseData } from '~types/index';

export type ResponsePayload<T = any> = {
    message: string;
    data: T;
    success: boolean;
    error: string;
};
