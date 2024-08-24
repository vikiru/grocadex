import * as middlewares from './middlewares/index';

import { router } from './routes';

import express = require('express');

const app = express();

app.use(middlewares.helmet());
app.use(middlewares.cors({ methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
app.use(middlewares.bodyParser.json());
app.use(middlewares.bodyParser.urlencoded({ extended: true }));
app.use(middlewares.validator);
app.use(middlewares.compression());
app.use(middlewares.morgan);

app.use('/api/v1', router);

export { app };
