import nodemailer from 'nodemailer';
import 'dotenv/config';

const config = {
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_AUHT_PASS,
    },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = async data => {
    return await transporter.sendMail(data);
};

const sendVerificationEmail = async (email, verificationToken) => {
    const verificationEmail = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify your email',
        text: `Thank you for registration. Please click the link to verify your email:
            http://localhost:3000/api/auth/verify/${verificationToken}`,
    };
    console.log('verificationEmail', verificationEmail);
    const result = await sendEmail(verificationEmail);
    console.log('result', result);
    return true;
};

export default sendVerificationEmail;
