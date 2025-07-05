import User from '../models/User.js';
import bcrypt from 'bcrypt';
import HttpError from '../helpers/HttpError.js';
import jwt from '../helpers/jwt.js';
import sendVerificationEmail from '../configs/mail.config.js';
import { nanoid } from 'nanoid';

export const findUser = query => User.findOne({ where: query, raw: true });

const register = async payload => {
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const newUser = await User.create({ ...payload, password: hashedPassword });
    const verificationToken = nanoid();
    await User.update({ verificationToken }, { where: { id: newUser.id } });

    await sendVerificationEmail(newUser.email, verificationToken);

    return newUser;
};

const login = async ({ email, password }) => {
    const user = await findUser({ email });
    if (!user) throw HttpError(401, 'Email or password is wrong');

    if (!user.verify) throw HttpError(401, 'Email not verified');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw HttpError(401, 'Email or password is wrong');

    const token = jwt.create({ id: user.id });
    await User.update({ token }, { where: { id: user.id } });

    return { token, user: { email: user.email, subscription: user.subscription, avatarURL: user.avatarURL } };
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

const verifyValidationToken = async verificationToken => {
    const user = await findUser({ verificationToken });
    if (!user) throw HttpError(404, 'User not found');

    await User.update({ verify: true, verificationToken: null }, { where: { id: user.id } });
};

const getVerificationEmail = async email => {
    const user = await findUser({ email });
    if (!user) throw HttpError(404, 'User not found');

    if (user.verify) throw HttpError(400, 'Verification has already been passed');

    const verificationToken = nanoid();
    await User.update({ verificationToken }, { where: { id: user.id } });

    await sendVerificationEmail(email, verificationToken);
};

const authService = {
    register,
    login,
    logout,
    subscription,
    verifyValidationToken,
    getVerificationEmail,
};

export default authService;
