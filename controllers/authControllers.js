import authService from '../services/authService.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';

const register = async (req, res) => {
    const newUser = await authService.register(req.body);
    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        },
    });
};

const login = async (req, res) => {
    const { token, user } = await authService.login(req.body);
    res.json({ token, user });
};

const logout = async (req, res) => {
    await authService.logout(req.user.id);
    res.status(204).json();
};

const current = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({
        email,
        subscription,
    });
};

const subscription = async (req, res) => {
    const user = await authService.subscription(req.body);
    res.json({
        id: user.id,
        email: user.email,
        subscription: user.subscription,
    });
};

const updateAvatar = async (req, res) => {
    const { id } = req.user;
    const avatarURL = await authService.updateAvatar(id, req.file);

    res.json({ avatarURL });
};

const authCtrl = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout),
    current: ctrlWrapper(current),
    subscription: ctrlWrapper(subscription),
    updateAvatar: ctrlWrapper(updateAvatar),
};

export default authCtrl;
