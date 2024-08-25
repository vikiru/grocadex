import * as middlewares from './middlewares/index';

import { ActiveItemRouter, GroceryItemRouter, ReceiptRouter, UserRouter } from './routes';

import express = require('express');

const app = express();

app.use(middlewares.helmet());
app.use(middlewares.cors({ methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
app.use(middlewares.bodyParser.json());
app.use(middlewares.bodyParser.urlencoded({ extended: true }));
app.use(middlewares.validator);
app.use(middlewares.compression());
app.use(middlewares.morgan);

app.use(ActiveItemRouter);
app.use(GroceryItemRouter);
app.use(ReceiptRouter);
app.use(UserRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});

export { app };
