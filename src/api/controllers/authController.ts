import { NextFunction, Request, Response } from 'express';

import passport from 'passport';
import { logger } from '~config/logger';
import { UserRequest } from '~types/express';

export async function loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    passport.authenticate('local', (err, user) => {
        if (err) {
            logger.error(`An error occurred during authentication: ${err}`);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        req.logIn(user, (err) => {
            if (err) {
                logger.error(`An error occurred while logging in: ${err}`);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.status(200).json({ message: 'User successfully logged in' });
        });
    })(req, res, next);
}

export async function logoutUser(req: UserRequest, res: Response): Promise<void> {
    try {
        req.logout((err) => {
            if (err) {
                logger.error(`Error during logout: ${err}`);
                return res.status(500).json({ error: 'Failed to log out' });
            }

            req.session?.destroy((err) => {
                if (err) {
                    logger.error(`Error destroying session: ${err}`);
                    return res.status(500).json({ error: 'Failed to destroy session' });
                }

                res.clearCookie('connect.sid');

                res.status(200).json({ message: 'User has been successfully logged out' });
            });
        });
    } catch (error) {
        logger.error(`Error logging out user: ${error}`);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
}
