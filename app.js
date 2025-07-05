import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import './db/sequelize.js';
import contactsRouter from './routes/contactsRouter.js';
import authRouter from './routes/authRouter.js';
// import User from './models/User.js';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter);

app.use((_, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Server error' } = err;
    res.status(status).json({ message });
});

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log('🔥🔥🔥 Server is running on port: 3000 🔥🔥🔥');
});
