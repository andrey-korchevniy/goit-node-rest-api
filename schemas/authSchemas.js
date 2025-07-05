import Joi from 'joi';
import { emailRegex } from '../constants/constants.js';

export const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().required().min(6),
});

export const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().required(),
});

export const subscriptionSchema = Joi.object({
    subscription: Joi.string().valid('starter', 'pro', 'business').required(),
    id: Joi.number().required(),
});

export const verifyVerificationTokenSchema = Joi.object({
    verificationToken: Joi.string().required(),
});

export const getVerificationEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
});
