import { Request, Response } from 'express';
import {
    AuthService,
    ExpenseService,
    GroceryItemService,
    ReceiptService,
    UserService,
} from '~services/';

import { User } from '@prisma/client';
import { logger } from '~config/logger';
import { ResponsePayload } from '~types/index';

export async function createUser(req: Request, res: Response): Promise<void> {
    const user: User = req.body;
    const response: ResponsePayload = {
        message: '',
        data: null,
        success: false,
        error: '',
    };

    try {
        if (await AuthService.checkIfUserExists(user.username)) {
            response['message'] = 'Username is already taken.';
            response['error'] = 'Username is already taken.';
            return res.status(400).json(response);
        }

        if (await AuthService.checkIfEmailExists(user.email)) {
            response['message'] = 'Email is already taken.';
            response['error'] = 'Email is already taken.';
            return res.status(400).json(response);
        }

        const newUser = await UserService.saveUser(user);
        if (newUser) {
            response['message'] = 'User created successfully.';
            response['success'] = true;
            response['error'] = 'No error occurred.';
            res.status(201).json(response);
        } else {
            response['message'] = 'Failed to create user.';
            response['error'] = 'Failed to create user.';
            res.status(400).json(response);
        }
    } catch (error) {
        logger.error(`Error creating user: ${error}`);
        response['message'] = 'Internal server error.';
        response['error'] = 'Failed to create user.';
        res.status(500).json(response);
    }
}

export async function getUserById(req: Request, res: Response): Promise<void> {
    const userId = req.user;
    const response: ResponsePayload = {
        message: '',
        data: null,
        success: false,
        error: '',
    };

    try {
        const user = await UserService.retrieveUserById(userId);

        if (user) {
            delete user.password;
            response['data'] = user;
            response['success'] = true;
            response['message'] = 'Successfully retrieved user.';
            response['error'] = 'No error occurred.';
            res.status(200).json(response);
        } else {
            response['message'] = 'User not found.';
            response['error'] = 'User not found.';
            res.status(404).json(response);
        }
    } catch (error) {
        logger.error(`Error retrieving user with id ${userId}: ${error}`);
        response['message'] = 'Internal server error.';
        response['error'] = 'Failed to retrieve user.';
        res.status(500).json(response);
    }
}

export async function getUserData(req: Request, res: Response): Promise<void> {
    const userId = req.user || 1;

    console.log('Body', req.body);
    console.log('Session:', req.session);
    console.log('Cookies:', req.cookies);
    console.log('User:', req.user);
    console.log('Auth', req.isAuthenticated());

    const response: ResponsePayload = {
        message: '',
        data: { groceryItems: [], receipts: [], expenses: [] },
        success: false,
        error: '',
    };

    try {
        const groceryItems =
            (await GroceryItemService.retrieveGroceryItemsByUser(userId)) || [];
        const receipts = (await ReceiptService.retrieveReceipts(userId)) || [];
        const expenses =
            (await ExpenseService.retrieveAllExpensesByUserId(userId)) || [];

        response['data'] = { groceryItems, receipts, expenses };
        response['message'] =
            'Successfully retrieved receipts and grocery items for user.';
        response['success'] = true;
        response['error'] = 'No error occurred.';
        res.status(200).json(response);
    } catch (error) {
        logger.error(
            `Error retrieving user data for user id ${userId}: ${error}`,
        );
        response['message'] = 'Internal server error.';
        response['error'] = 'Failed to retrieve user data.';
        res.status(500).json(response);
    }
}
