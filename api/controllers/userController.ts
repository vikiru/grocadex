import { Request, Response } from 'express';
import { AuthService, UserService } from '../services';

import { User } from '@prisma/client';
import { logger } from '../config/logger';
import { UserRequest } from '../types/express';

export async function createUser(req: Request, res: Response): Promise<void> {
    const user: User = req.body;

    try {
        if (await AuthService.checkIfUserExists(user.username)) {
            res.status(400).json({ error: 'Username is already taken' });
            return;
        }

        if (await AuthService.checkIfEmailExists(user.email)) {
            res.status(400).json({ error: 'Email is already taken' });
            return;
        }

        await UserService.saveUser(user);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        logger.error(`Error creating user: ${error}`);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

export async function getUserById(req: UserRequest, res: Response): Promise<void> {
    const userId = req.user;

    try {
        const user = await UserService.retrieveUserById(userId);

        if (user) {
            delete user.password;
            res.status(200).json({ data: user });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        logger.error(`Error retrieving user with id ${userId}: ${error}`);
        res.status(500).json({ error: 'Internal server error.' });
    }
}
