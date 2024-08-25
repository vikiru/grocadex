const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const helmet = require('helmet');
const morgan = require('morgan');
const favicon = require('serve-favicon');

const { env } = require('../config/index');
const { logger } = require('../config/logger');

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

const validationMiddleware = [
    body('*').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export {
    body,
    bodyParser,
    compression,
    cors,
    favicon,
    helmet,
    morganMiddleware as morgan,
    validationMiddleware as validator,
};
