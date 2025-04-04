import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import passport from 'passport';
import { secret } from '~config/index';
import { logger } from '~config/logger';
import { ResponsePayload, UserRequest } from '~types';

export async function loginUser(
    req: UserRequest,
    res: Response,
    next: NextFunction,
): Promise<void> {
    const response: ResponsePayload = {
        message: '',
        data: null,
        success: false,
        error: '',
    };

    passport.authenticate('local', (err: Error, user: User) => {
        if (err) {
            logger.error(`An error occurred during authentication: ${err}`);
            response['message'] = 'Internal server error.';
            response['error'] = 'An error occurred during authentication';
            res.status(500).json(response);
        }

        if (!user) {
            response['message'] = 'Invalid credentials.';
            response['error'] =
                'There was an error authenticating the given user with the provided credentials. Please try again.';
            res.status(401).json(response);
        }

        req.logIn(user, (err: Error) => {
            if (err) {
                logger.error(`An error occurred while logging in: ${err}`);
                response['message'] = 'Internal server error.';
                response['error'] = 'An error occurred while logging in';
                res.status(500).json(response);
            }
            const { password, ...userData } = user;
            const accessToken = jwt.sign({ id: user.id }, secret, {
                expiresIn: '1d',
            });
            const refreshToken = jwt.sign({ id: user.id }, secret, {
                expiresIn: '7d',
            });
            response['message'] = 'User successfully logged in.';
            response['data'] = userData;
            response['access_token'] = accessToken;
            response['refresh_token'] = refreshToken;
            response['success'] = true;
            response['error'] = 'No error occured.';
            res.status(200).json(response);
        });
    })(req, res, next);
}

export async function logoutUser(
    req: UserRequest,
    res: Response,
): Promise<void> {
    const response: ResponsePayload = {
        message: '',
        data: null,
        success: false,
        error: '',
    };

    try {
        req.logout((err: Error) => {
            if (err) {
                logger.error(`Error during logout: ${err}`);
                response['message'] = 'Internal server error.';
                response['error'] = 'Failed to log out';
                res.status(500).json(response);
            }

            req.session?.destroy((err: Error) => {
                if (err) {
                    logger.error(`Error destroying session: ${err}`);
                    response['message'] = 'Internal server error.';
                    response['error'] = 'Failed to destroy session';
                    res.status(500).json(response);
                }

                res.clearCookie('connect.sid');

                response['message'] = 'User has been successfully logged out';
                response['data'] = null;
                response['success'] = true;
                response['error'] = 'No error occurred';
                res.status(200).json(response);
            });
        });
    } catch (error) {
        logger.error(`Error logging out user: ${error}`);
        response['message'] = 'Internal server error.';
        response['error'] = 'An unexpected error occurred';
        res.status(500).json(response);
    }
}

export async function refreshToken(
    req: UserRequest,
    res: Response,
): Promise<void> {
    const response: ResponsePayload = {
        message: '',
        data: null,
        success: false,
        error: '',
    };

    const refreshToken = req.body.refresh_token;
    if (!refreshToken) {
        response['message'] = 'Refresh token is required.';
        response['error'] = 'Refresh token is required.';
        res.status(400).json(response);
    }

    try {
        const decoded = jwt.verify(refreshToken, secret);
        const userId = (decoded as { id: number }).id;

        const accessToken = jwt.sign({ id: userId }, secret, {
            expiresIn: '1d',
        });

        response['message'] = 'Access token refreshed successfully.';
        response['data'] = { access_token: accessToken };
        response['success'] = true;
        res.status(200).json(response);
    } catch (error: any) {
        logger.error(`Error verifying refresh token: ${error.message}`);
        response['message'] = 'Invalid refresh token or expired.';
        response['error'] = 'Refresh token verification failed.';
        res.status(401).json(response);
    }
}
