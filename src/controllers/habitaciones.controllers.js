import Habitacion from "../databases/models/habitaciones.js";
import Usuario from "../databases/models/usuarios.js";
import cloudinary from "../config/cloudinaryConfig.js";
import { Readable } from "stream";

export const listarHabitaciones = async (req, res) => {
  try {
    // Obtener todas las habitaciones de la base de datos
    const habitaciones = await Habitacion.find();

    // Enviar la lista de habitaciones como respuesta
    res.status(200).json(habitaciones);
  } catch (error) {
    // Manejo de errores
    res.status(500).json({
      message: "Error al obtener la lista de habitaciones.",
      error: error.message,
    });
  }
};

export const crearHabitacion = async (req, res) => {
  try {
    const { number, type, price, startDate, endDate } = req.body;
    const email = req.userEmail;

    // Necesitamos buscar en Usuarios si el email le pertenece a un administrador
    const administradorBuscado = await Usuario.findOne({ email });

    if (!administradorBuscado) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado. Acceso no autorizado." });
    }

    if (administradorBuscado.role !== "admin") {
      return res
        .status(401)
        .json({ message: "El usuario no tiene permisos para esta acción." });
    }

    const habitacionExistente = await Habitacion.findOne({ number });

    //Si ya hay una habitacion con ese numero
    if (habitacionExistente) {
      return res
        .status(400)
        .json({ message: "El número de habitación ya existe." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Por favor, sube una imagen." });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res
        .status(400)
        .json({ message: "El archivo debe ser una imagen JPG, JPEG o PNG." });
    }

    // Subir la imagen a Cloudinary
    const result = await new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder: "oasis/habitaciones" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      Readable.from(req.file.buffer).pipe(upload);
    });

    // Crear una nueva habitación
    const nuevaHabitacion = new Habitacion({
      number,
      type,
      price,
      startDate,
      endDate,
      image: result.secure_url, // Guardar la URL de la imagen
    });

    const habitacionGuardada = await nuevaHabitacion.save();

    res.status(201).json({
      message: "Habitación creada exitosamente.",
      habitacion: habitacionGuardada,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la habitación.",
      error: error.message,
    });
  }
};

export const eliminarHabitacion = async (req, res) => {
  try {
    const { id } = req.params; // Obtenemos el id de los parámetros de la ruta

    // Intentamos encontrar y eliminar la habitación por su id
    const habitacionEliminada = await Habitacion.findByIdAndDelete(id);

    if (!habitacionEliminada) {
      return res.status(404).json({ mensaje: "Habitación no encontrada" });
    }

    return res.status(200).json({
      mensaje: "Habitación eliminada con éxito",
      habitacion: habitacionEliminada,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al eliminar la habitación",
      error: error.message,
    });
  }
};

export const editarHabitacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { number, type, price, startDate, endDate } = req.body;

    const updatedHabitacion = { number, type, price, startDate, endDate };

    // Si se envía un archivo nuevo, súbelo a Cloudinary
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          { folder: "oasis/habitaciones" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        Readable.from(req.file.buffer).pipe(upload);
      });

      // Agregar la nueva URL de la imagen al objeto de actualización
      updatedHabitacion.image = result.secure_url;
    }

    // Actualizar la habitación en la base de datos
    const habitacionEditada = await Habitacion.findByIdAndUpdate(
      id,
      updatedHabitacion,
      {
        new: true, // Devuelve el documento actualizado
      }
    );

    if (!habitacionEditada) {
      return res.status(404).json({ message: "Habitación no encontrada." });
    }

    res.status(200).json({
      succes: true,
      message: "Habitación editada exitosamente.",
      habitacion: habitacionEditada,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "Error al editar la habitación.",
      error: error.message,
    });
  }
};
