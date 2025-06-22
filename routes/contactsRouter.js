import express from "express";
import ctrl from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import schemas from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", ctrl.getOneContact);

contactsRouter.delete("/:id", ctrl.deleteContact);

contactsRouter.post("/", validateBody(schemas.createContact), ctrl.createContact);

contactsRouter.put("/:id", validateBody(schemas.updateContact), ctrl.updateContact);

contactsRouter.patch("/:id/favorite", validateBody(schemas.updateStatusContact), ctrl.updateStatusContact);

export default contactsRouter;
