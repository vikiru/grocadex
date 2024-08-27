import './strategies/local';

import * as middlewares from './middlewares/index';

import { apiVersionString, port } from './config';
import { ActiveItemRouter, AuthRouter, GroceryItemRouter, ReceiptRouter, UserRouter } from './routes';

import express from 'express';
import passport from 'passport';
import { logger } from './config/logger';

const app = express();

app.use(middlewares.session);
app.use(passport.initialize());
app.use(passport.session());
app.use(middlewares.helmet());
app.use(middlewares.cors({ methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
app.use(middlewares.bodyParser.json());
app.use(middlewares.bodyParser.urlencoded({ extended: true }));
app.use(middlewares.validator);
app.use(middlewares.compression());
app.use(middlewares.morgan);

app.listen(port, () => logger.info(`groceryapi started on port: http://localhost:${port}/${apiVersionString}.`));

app.set('trust proxy', 1);

app.use(AuthRouter);
app.use(ActiveItemRouter);
app.use(GroceryItemRouter);
app.use(ReceiptRouter);
app.use(UserRouter);

export { app };
