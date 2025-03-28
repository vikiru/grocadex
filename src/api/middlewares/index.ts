import { NextFunction, Request, Response } from 'express';

import compression from 'compression';
import cors from 'cors';
import crypto from 'crypto';
import session from 'express-session';
import { body } from 'express-validator';
import helmet from 'helmet';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import { env } from '~config/index';
import { logger } from '~config/logger';

const morganStream = {
    write: (message) => logger.http(message),
};

const skip = () => {
    return env !== 'development';
};

const morganMiddleware = morgan('dev', {
    stream: morganStream,
    skip,
});

const secret = crypto.randomBytes(32).toString('hex');

const sessionMiddleware = session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: env === 'production' },
});

export function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (req.isAuthenticated() || !req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'User is not authenticated' });
}

export {
    body,
    compression,
    cors,
    favicon,
    helmet,
    morganMiddleware as morgan,
    sessionMiddleware as session,
};
