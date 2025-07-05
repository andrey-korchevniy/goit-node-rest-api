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

const verifyValidationToken = async (req, res) => {
    const { verificationToken } = req.params;
    await authService.verifyValidationToken(verificationToken);
    res.json({ message: 'Verification successful' });
};

const getVerificationEmail = async (req, res) => {
    const { email } = req.body;
    await authService.getVerificationEmail(email);
    res.json({ message: 'Verification email sent' });
};

const authCtrl = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout),
    current: ctrlWrapper(current),
    subscription: ctrlWrapper(subscription),
    verifyValidationToken: ctrlWrapper(verifyValidationToken),
    getVerificationEmail: ctrlWrapper(getVerificationEmail),
};

export default authCtrl;
