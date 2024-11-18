import { ResponseData } from '~types/index';

export type ResponsePayload = {
    message: string;
    data: ResponseData;
    success: boolean;
    error: string;
};
