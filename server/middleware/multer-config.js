const multer = require('multer');

// Définie les types d'images acceptés par Multer
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

// Définie l'emplacement du stockage de l'image envoyé et la renomme avec la date actuelle
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const extension = MIME_TYPES[file.mimetype];
        callback(null, Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).single('image');