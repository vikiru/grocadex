const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const helmet = require('helmet');
const morgan = require('morgan');
const favicon = require('serve-favicon');

const validator = [
    body('*').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export { body, bodyParser, compression, cors, favicon, helmet, morgan, validator };
