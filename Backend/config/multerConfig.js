// backend/config/multerConfig.js
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'service_images', // Folder in Cloudinary
    allowed_formats: ['jpeg', 'png', 'jpg'], // Supported formats
  },
});

const upload = multer({ storage });

export default upload;
