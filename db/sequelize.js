import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
        },
    },
});

try {
    await sequelize.authenticate();
    console.log('Database connection successful.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
}

export default sequelize;
