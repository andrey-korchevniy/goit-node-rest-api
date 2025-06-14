import Joi from "joi";

export const createContact = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean().optional(),
});

export const updateContact = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
});

export const updateStatusContact = Joi.object({
    favorite: Joi.boolean().required(),
});

const schemas = {
    createContact,
    updateContact,
    updateStatusContact
};

export default schemas;