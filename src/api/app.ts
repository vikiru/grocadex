import 'module-alias/register';
import '~strategies/local';
import '~strategies/jwt';

import * as middlewares from '~middlewares/';

import { apiVersionString, port } from '~config/index';
import {
    AuthRouter,
    ExpenseRouter,
    GroceryItemRouter,
    ReceiptRouter,
    UserRouter,
} from '~routes/';

import express from 'express';
import passport from 'passport';
import { logger } from '~config/logger';

const app = express();

app.use(middlewares.session);
app.use(passport.initialize());
app.use(passport.session());
app.use(middlewares.helmet());
app.use(
    middlewares.cors({
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        origin: ['http://localhost:8081'],
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middlewares.compression());
app.use(middlewares.morgan);

app.set('trust proxy', process.env.NODE_ENV === 'production' ? 1 : 0);

app.use(AuthRouter);
app.use(ExpenseRouter);
app.use(GroceryItemRouter);
app.use(ReceiptRouter);
app.use(UserRouter);

app.listen(port, () =>
    logger.info(
        `grocadex-api started on port: http://localhost:${port}/${apiVersionString}.`,
    ),
);

export { app };
