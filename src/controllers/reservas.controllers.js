import Reserva from "../databases/models/reservas.js";
import Habitacion from "../databases/models/habitaciones.js";
import User from "../databases/models/usuarios.js";

// Lista todas las reservas
export const listarReservas = async (req, res) => {
  try {
    // Obtenemos todas las reservas, populando los campos de usuario e habitación
    const reservas = await Reserva.find()
      .populate("idUser", "name email") // Especifica qué campos del usuario traer
      .populate("idRoom", "number type price"); // Especifica qué campos de la habitación traer

    // Devolvemos las reservas, que podrían ser un array vacío si no hay reservas
    res.status(200).json(reservas);
  } catch (error) {
    // Si ocurre un error, devolvemos el error
    res
      .status(500)
      .json({ message: "Error al obtener las reservas", error: error.message });
  }
};

export const listarReservasPorUsuario = async (req, res) => {
  const { idUser } = req.params; // Obtener el id del usuario desde los parámetros de la ruta
  try {
    const reservas = await Reserva.find({ idUser })
      .populate("idUser", "name email")
      .populate("idRoom", "number type price image");

    // Si no hay reservas, se devuelve un array vacío
    res.status(200).json(reservas);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las reservas", error: error.message });
  }
};

export const crearReserva = async (req, res) => {
  try {
    const { idUser, type, checkIn, checkOut } = req.body;

    // Validación de los datos recibidos
    if (!idUser || !type || !checkIn || !checkOut) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    // Validamos que exista el usuario
    const usuario = await User.findById(idUser);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (usuario.role !== "usuario") {
      return res
        .status(401)
        .json({ message: "El usuario no tiene permisos para crear reservas." });
    }

    if (usuario.state !== "activo") {
      return res.status(401).json({ message: "El usuario esta suspendido." });
    }

    //Validamos que se envie un tipo valido de habitación
    const tiposValidos = [
      "Superior",
      "Deluxe",
      "Presidencial",
      "Ejecutiva",
      "Junior",
    ];
    if (!tiposValidos.includes(type)) {
      return res.status(400).json({ message: "Tipo de habitación no válido" });
    }

    // Convertir las fechas de string a objetos Date
    const fechaCheckIn = new Date(checkIn);
    const fechaCheckOut = new Date(checkOut);

    // Validación adicional: fechas dentro del rango de disponibilidad
    const habitacionesConRango = await Habitacion.find({
      type: type,
      startDate: { $lte: fechaCheckIn },
      endDate: { $gte: fechaCheckOut },
    });

    if (habitacionesConRango.length === 0) {
      return res.status(404).json({
        message: `No hay habitaciones disponibles del tipo ${type} dentro del rango de disponibilidad.`,
      });
    }

    // Buscar habitaciones disponibles del tipo solicitado
    const habitacionesDisponibles = await Habitacion.find({
      type: type,
      _id: {
        $nin: await Reserva.distinct("idRoom", {
          $or: [
            {
              checkIn: { $lt: fechaCheckOut },
              checkOut: { $gt: fechaCheckIn },
            },
            { checkIn: { $gte: fechaCheckIn, $lt: fechaCheckOut } },
            { checkOut: { $gt: fechaCheckIn, $lte: fechaCheckOut } },
          ],
        }),
      },
    });

    if (habitacionesDisponibles.length === 0) {
      return res.status(404).json({
        message: `No hay habitaciones disponibles del tipo ${type} para las fechas solicitadas`,
      });
    }

    // Seleccionar la primera habitación disponible
    const habitacionSeleccionada = habitacionesDisponibles[0];

    // Crear la nueva reserva
    const nuevaReserva = new Reserva({
      idUser,
      idRoom: habitacionSeleccionada._id,
      checkIn: fechaCheckIn,
      checkOut: fechaCheckOut,
    });

    // Guardar la reserva en la base de datos
    await nuevaReserva.save();

    // Responder con éxito
    res.status(201).json({
      message: "Reserva creada con éxito",
      reserva: nuevaReserva,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Hubo un error al crear la reserva",
      error: error.message,
    });
  }
};

export const verificarDisponibilidad = async (req, res) => {
  try {
    const { type, checkIn, checkOut } = req.query;

    // Validación de los datos recibidos
    if (!type || !checkIn || !checkOut) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    // Convertir las fechas de string a objetos Date
    const fechaCheckIn = new Date(checkIn);
    const fechaCheckOut = new Date(checkOut);

    // Validación adicional: fechas dentro del rango de disponibilidad
    const habitacionesConRango = await Habitacion.find({
      type: type,
      startDate: { $lte: fechaCheckIn },
      endDate: { $gte: fechaCheckOut },
    });

    if (habitacionesConRango.length === 0) {
      return res.status(404).json({
        message: `No hay habitaciones disponibles del tipo ${type} dentro del rango de disponibilidad.`,
      });
    }

    // Buscar habitaciones disponibles del tipo solicitado
    const habitacionesDisponibles = await Habitacion.find({
      type: type,
      _id: {
        $nin: await Reserva.distinct("idRoom", {
          $or: [
            {
              checkIn: { $lt: fechaCheckOut },
              checkOut: { $gt: fechaCheckIn },
            },
            { checkIn: { $gte: fechaCheckIn, $lt: fechaCheckOut } },
            { checkOut: { $gt: fechaCheckIn, $lte: fechaCheckOut } },
          ],
        }),
      },
    });

    const isAvailable = habitacionesDisponibles.length > 0;

    res.status(200).json({
      isAvailable,
      availableRooms: habitacionesDisponibles.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al verificar la disponibilidad",
      error: error.message,
    });
  }
};

// Esta petición solo esta disponible desde el backend
export const eliminarReserva = async (req, res) => {
  const { id } = req.params; // Obtener el id de la reserva desde los parámetros de la ruta

  try {
    // Buscar la reserva por ID
    const reserva = await Reserva.findById(id);

    // Verificar si la reserva existe
    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    // Eliminar la reserva de la base de datos
    await Reserva.deleteOne({ _id: id });

    // Responder con éxito
    res.status(200).json({ message: "Reserva eliminada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Hubo un error al eliminar la reserva" });
  }
};
