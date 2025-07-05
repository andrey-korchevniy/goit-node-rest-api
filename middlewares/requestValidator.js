import HttpError from '../helpers/HttpError.js';

export const validateBody = schema => {
    const func = (req, _, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            console.log(error);
            let message = '';
            if (req.originalUrl.includes('/api/auth')) {
                message = 'Помилка від Joi або іншої бібліотеки валідації';
            }
            return next(HttpError(400, message || error.message));
        }
        next();
    };

    return func;
};

export const validateParams = schema => {
    const func = (req, _, next) => {
        const { error } = schema.validate(req.params, { abortEarly: false });
        if (error) {
            let message = '';
            if (req.originalUrl.includes('/auth/verify/')) {
                message = 'Invalid verification token';
            } else if (req.originalUrl.includes('/auth/verify')) {
                message = 'Missing required field email';
            }
            return next(HttpError(400, message || error.message));
        }
        next();
    };

    return func;
};
