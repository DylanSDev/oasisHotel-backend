import Reservas from "../databases/models/reservas.js";

//Lista todas las reservas
export const listarReservas = async (req, res) => {
  try {
    // Obtenemos todas las reservas, populando los campos de usuario e habitación
    const reservas = await Reservas.find()
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
    const reservas = await Reservas.find({ idUser })
      .populate("idUser", "name email")
      .populate("idRoom", "number type price");

    // Si no hay reservas, se devuelve un array vacío
    res.status(200).json(reservas);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las reservas", error: error.message });
  }
};

export const crearReserva = async (req, res) => {};
