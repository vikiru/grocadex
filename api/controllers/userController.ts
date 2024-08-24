import { Request, Response } from 'express';

import { UserService } from '../services';

export async function createUser(req: Request, res: Response): Promise<void> {
    const user = req.body;

    try {
        if (await UserService.checkIfUserExists(user.userName)) {
            res.status(400).json({ error: 'Username is already taken' });
            return;
        }

        if (await UserService.checkIfEmailExists(user.email)) {
            res.status(400).json({ error: 'Email is already taken' });
            return;
        }

        await UserService.saveUser(user);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(`Error creating user: ${error}`);
        res.status(500).json({ error });
    }
}

export async function getUserById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);

    try {
        const user = await UserService.retrieveUserById(id);

        if (user) {
            res.status(200).json({ data: user });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(`Error retrieving user with id ${id}: ${error}`);
        res.status(500).json({ error });
    }
}

export async function getAllUsers(req: Request, res: Response): Promise<void> {
    try {
        const users = await UserService.retrieveAllUsers();

        if (users.length > 0) {
            res.status(200).json({ data: users });
        } else {
            res.status(404).json({ error: 'No users found' });
        }
    } catch (error) {
        console.error(`Error retrieving all users: ${error}`);
        res.status(500).json({ error });
    }
}
