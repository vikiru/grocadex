import { User } from '@prisma/client';

export const users: Omit<User, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@email.com',
        username: 'johndoe',
        password: 'password',
    },
    {
        firstName: 'Bob',
        lastName: 'Bob',
        email: 'bobbob@email.com',
        username: 'bobb',
        password: 'password',
    },
    {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@email.com',
        username: 'demo',
        password: 'password',
    },
];
