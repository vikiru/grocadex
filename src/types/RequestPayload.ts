export type RequestPayload<T = any> = {
    url: string;
    id?: number;
    data?: T;
};
