import { NextFunction, Request, Response } from 'express';

import passport from 'passport';
import { logger } from '~config/logger';
import { ResponsePayload } from '~types/index';

export async function loginUser(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    const response: ResponsePayload = {
        message: '',
        data: null,
        success: false,
        error: '',
    };

    passport.authenticate('local', (err, user) => {
        if (err) {
            logger.error(`An error occurred during authentication: ${err}`);
            response['message'] = 'Internal server error.';
            response['error'] = 'An error occurred during authentication';
            return res.status(500).json(response);
        }

        if (!user) {
            response['message'] = 'Invalid credentials.';
            response['error'] =
                'There was an error authenticating the given user with the provided credentials. Please try again.';
            return res.status(401).json(response);
        }

        req.logIn(user, (err) => {
            if (err) {
                logger.error(`An error occurred while logging in: ${err}`);
                response['message'] = 'Internal server error.';
                response['error'] = 'An error occurred while logging in';
                return res.status(500).json(response);
            }
            const { password, ...userData } = user;
            response['message'] = 'User successfully logged in.';
            response['data'] = userData;
            response['success'] = true;
            response['error'] = 'No error occured.';
            res.status(200).json(response);
        });
    })(req, res, next);
}

export async function logoutUser(req: Request, res: Response): Promise<void> {
    const response: ResponsePayload = {
        message: '',
        data: null,
        success: false,
        error: '',
    };

    try {
        req.logout((err) => {
            if (err) {
                logger.error(`Error during logout: ${err}`);
                response['message'] = 'Internal server error.';
                response['error'] = 'Failed to log out';
                return res.status(500).json(response);
            }

            req.session?.destroy((err) => {
                if (err) {
                    logger.error(`Error destroying session: ${err}`);
                    response['message'] = 'Internal server error.';
                    response['error'] = 'Failed to destroy session';
                    return res.status(500).json(response);
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
