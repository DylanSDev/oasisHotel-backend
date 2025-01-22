import Habitacion from "../databases/models/habitaciones.js";

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
    // Extraer los datos del cuerpo de la solicitud
    const { number, type, price, startDate, endDate, image } = req.body;

    // Crear una nueva instancia del modelo
    const nuevaHabitacion = new Habitacion({
      number,
      type,
      price,
      startDate,
      endDate,
      image,
    });

    // Guardar la habitación en la base de datos
    const habitacionGuardada = await nuevaHabitacion.save();

    // Enviar respuesta exitosa
    res.status(201).json({
      message: "Habitación creada exitosamente.",
      habitacion: habitacionGuardada,
    });
  } catch (error) {
    // Manejo de errores
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
