import Habitacion from "../databases/models/habitaciones.js";

export const listarHabitaciones = (req, res) => {
  console.log("Aquí preparo la lista de habitaciones");
  res.send("Enviando la lista de habitaciones...");
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
