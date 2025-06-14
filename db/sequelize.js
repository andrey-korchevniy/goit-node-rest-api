import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialectOptions: {
        ssl: {
            require: true,
        },
    },
});

console.log(process.env.DB_DIALECT, process.env.DB_HOST, process.env.DB_PORT, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME);

try {
    await sequelize.authenticate();
    console.log("Database connection successful.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
}

export default sequelize;
