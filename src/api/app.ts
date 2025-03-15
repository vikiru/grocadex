import 'module-alias/register';
import '~strategies/local';

import * as middlewares from '~middlewares/';

import { apiVersionString, port } from '~config/index';
import {
    ActiveItemRouter,
    AuthRouter,
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
app.use(middlewares.cors({ methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middlewares.compression());
app.use(middlewares.morgan);

app.listen(port, () =>
    logger.info(
        `groceryapi started on port: http://localhost:${port}/${apiVersionString}.`,
    ),
);

app.set('trust proxy', 1);

app.use(AuthRouter);
app.use(ActiveItemRouter);
app.use(GroceryItemRouter);
app.use(ReceiptRouter);
app.use(UserRouter);

export { app };
