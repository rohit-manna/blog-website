import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const storage = new GridFsStorage({
    url: 'mongodb://127.0.0.1:27017/blogweb', // ✅ LOCAL DB
    file: (req, file) => {
        const match = ['image/png', 'image/jpg', 'image/jpeg'];

        if (!match.includes(file.mimetype)) {
            return {
                filename: `${Date.now()}-blog-${file.originalname}`
            };
        }

        return {
            bucketName: 'photos',
            filename: `${Date.now()}-blog-${file.originalname}`
        };
    }
});

export default multer({ storage });
