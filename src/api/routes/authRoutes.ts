import express = require('express');

import { apiVersionString } from '~config/index';
import { AuthController } from '~controllers/';
import { ensureAuthenticated } from '~middlewares/';

const baseUrl = `/${apiVersionString}/auth`;

const AuthRouter = express.Router();

AuthRouter.post(`${baseUrl}/login`, AuthController.loginUser);
AuthRouter.post(`${baseUrl}/logout`, ensureAuthenticated, AuthController.logoutUser);

export { AuthRouter };
