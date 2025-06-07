import Joi from "joi";

export const createContact = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
});

export const updateContact = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
});

const schemas = {
    createContact,
    updateContact,
};

export default schemas;