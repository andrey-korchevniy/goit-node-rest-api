import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import { emailRegex } from '../constants/constants.js';

const User = sequelize.define('user', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'Email in use',
        },
        validate: {
            is: emailRegex,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subscription: {
        type: DataTypes.ENUM,
        values: ['starter', 'pro', 'business'],
        defaultValue: 'starter',
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
});

// User.sync({ alter: true });

export default User;
