import HttpError from '../helpers/HttpError.js';
import { findUser } from '../services/authService.js';
import jwt from '../helpers/jwt.js';

const authenticate = async (req, _, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return next(HttpError(401, 'Not authorized'));
    }

    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
        return next(HttpError(401, 'Not authorized'));
    }
    try {
        const { id } = jwt.verify(token);
        const user = await findUser({ id });
        if (!user || !user.token) return next(HttpError(401, 'Not authorized'));
        req.user = user;
        next();
    } catch (error) {
        next(HttpError(401, 'Not authorized'));
    }
};

export default authenticate;
