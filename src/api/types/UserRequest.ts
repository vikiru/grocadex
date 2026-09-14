import { Request } from 'express';

declare global {
    namespace Express {
        interface User {
            id: number;
        }
    }
}

export interface UserRequest extends Request {
    user?: {
        id: number;
    };
}

export function getUserId(req: UserRequest): number {
    if (!req.user) {
        throw new Error('Authenticated user is required.');
    }

    return req.user.id;
}
