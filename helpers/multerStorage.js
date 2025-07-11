import multer from 'multer';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'temp');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    limits: {
        fileSize: 1048576,
    },
});

const upload = multer({ storage });

export default upload;
