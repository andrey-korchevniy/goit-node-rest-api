import User from '../models/User.js';
import bcrypt from 'bcrypt';
import HttpError from '../helpers/HttpError.js';
import jwt from '../helpers/jwt.js';

export const findUser = query => User.findOne({ where: query, raw: true });

const register = async payload => {
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    return await User.create({ ...payload, password: hashedPassword });
};

const login = async ({ email, password }) => {
    const user = await findUser({ email });
    if (!user) throw HttpError(401, 'Email or password is wrong');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw HttpError(401, 'Email or password is wrong');

    const token = jwt.create({ id: user.id });
    await User.update({ token }, { where: { id: user.id } });

    return { token, user: { email: user.email, subscription: user.subscription } };
};

const logout = async id => {
    await User.update({ token: null }, { where: { id } });
};

const subscription = async ({ id, subscription }) => {
    const user = await findUser({ id });
    if (!user) throw HttpError(401, 'No user with this id');

    const [_, updatedUser] = await User.update({ subscription }, { where: { id }, returning: true });
    return updatedUser[0];
};

const authService = {
    register,
    login,
    logout,
    subscription,
};

export default authService;
