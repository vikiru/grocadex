import express = require('express');

import { ActiveItemController } from '../controllers';

const ActiveItemRouter = express.Router();

ActiveItemRouter.post('/active-items', ActiveItemController.createActiveItem);
ActiveItemRouter.get('/active-items', ActiveItemController.getActiveItems);
ActiveItemRouter.delete('/active-items/:id', ActiveItemController.deleteActiveItems);

export { ActiveItemRouter };
