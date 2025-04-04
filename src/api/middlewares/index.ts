import { NextFunction, Request, Response } from 'express';

import compression from 'compression';
import cors from 'cors';
import session from 'express-session';
import { body } from 'express-validator';
import helmet from 'helmet';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import { env, secret } from '~config/index';
import { logger } from '~config/logger';

const morganStream = {
    write: (message: any) => logger.http(message),
};

const skip = () => {
    return env !== 'development';
};

const morganMiddleware = morgan('dev', {
    stream: morganStream,
    skip,
});

const sessionMiddleware = session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: env === 'production' },
});

export {
    body,
    compression,
    cors,
    favicon,
    helmet,
    morganMiddleware as morgan,
    sessionMiddleware as session,
};
