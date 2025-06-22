import jsonwebtoken from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

const create = payload => jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: '1h' });

const verify = token => jsonwebtoken.verify(token, JWT_SECRET);

const jwt = {
    create,
    verify,
};

export default jwt;
