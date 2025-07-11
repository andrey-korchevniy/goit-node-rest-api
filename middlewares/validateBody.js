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

export const validateAvatar = (req, _, next) => {
    if (!req.file) {
        return next(HttpError(400, 'No file uploaded'));
    }
    next();
};
