import multer from "multer";

// Configuración básica para almacenar archivos en memoria
const storage = multer.memoryStorage(); // No guardar en disco
const upload = multer({ storage });

export default upload;
