import Joi from 'joi';
import { emailRegex } from '../constants/constants.js';

export const createContact = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegex).required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean().optional(),
});

export const updateContact = Joi.object({
    name: Joi.string(),
    email: Joi.string().pattern(emailRegex),
    phone: Joi.string(),
});

export const updateStatusContact = Joi.object({
    favorite: Joi.boolean().required(),
});

export const validateEmail = Joi.object({
    email: Joi.string()
        .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        .required()
        .messages({
            'string.pattern.base': 'Invalid email format',
        }),
});

const schemas = {
    createContact,
    updateContact,
    updateStatusContact,
    validateEmail,
};

export default schemas;
