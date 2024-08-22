import express = require('express');

import { ActiveItemController } from '../controllers';

const ActiveItemRouter = express.Router();

ActiveItemRouter.post('/active-items', ActiveItemController.createActiveItem);
ActiveItemRouter.get('/active-items', ActiveItemController.getActiveItems);
ActiveItemRouter.get('/active-items/:id', ActiveItemController.getActiveItemById);
ActiveItemRouter.put('/active-items/:id', ActiveItemController.updateActiveItem);
ActiveItemRouter.delete('/active-items/:id', ActiveItemController.deleteActiveItem);

export { ActiveItemRouter };
