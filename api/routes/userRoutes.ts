import express = require('express');

import { UserController } from '../controllers';

const UserRouter = express.Router();

UserRouter.get('/users', UserController.getAllUsers);
UserRouter.post('/users', UserController.createUser);
UserRouter.get('/users/:id', UserController.getUserById);

export { UserRouter };
