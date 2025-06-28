import User from '../models/User.js';
import bcrypt from 'bcrypt';
import HttpError from '../helpers/HttpError.js';
import jwt from '../helpers/jwt.js';
import gravatar from 'gravatar';
import fs from 'fs/promises';
import path from 'path';

export const findUser = query => User.findOne({ where: query, raw: true });

const register = async payload => {
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const avatarURL = await gravatar.url(payload.email);
    console.log(avatarURL);
    return await User.create({ ...payload, password: hashedPassword, avatarURL });
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

const updateAvatar = async (id, { path: tempUpload, originalname }) => {
    const storeAvatar = path.join(process.cwd(), 'public', 'avatars');
    const avatarName = `${id}_${originalname}`;
    const resultUpload = path.join(storeAvatar, avatarName);

    try {
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.posix.join('/avatars', avatarName);
        await User.update({ avatarURL }, { where: { id } });
        return avatarURL;
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        try {
            await fs.unlink(tempUpload);
        } catch (_) {}

        throw HttpError(500, 'Failed to update avatar');
    }
};

const authService = {
    register,
    login,
    logout,
    subscription,
    updateAvatar,
};

export default authService;
