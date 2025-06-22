import express from 'express';
import contactsCtrl from '../controllers/contactsControllers.js';
import schemas from '../schemas/contactsSchemas.js';
import validateBody from '../middlewares/validateBody.js';
import authenticate from '../middlewares/authenticate.js';

const contactsRouter = express.Router();
contactsRouter.use(authenticate);

contactsRouter.get('/', contactsCtrl.getAllContacts);

contactsRouter.get('/:id', contactsCtrl.getOneContact);

contactsRouter.delete('/:id', contactsCtrl.deleteContact);

contactsRouter.post('/', validateBody(schemas.createContact), contactsCtrl.createContact);

contactsRouter.put('/:id', validateBody(schemas.updateContact), contactsCtrl.updateContact);

contactsRouter.patch(
    '/:id/favorite',
    validateBody(schemas.updateStatusContact),
    contactsCtrl.updateStatusContact
);

export default contactsRouter;
