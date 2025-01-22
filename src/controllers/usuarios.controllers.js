import Usuario from "../databases/models/usuarios.js";

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    if (!usuarios) {
      return res.status(404).json({ message: "No se encontraron usuarios." });
    }

    res.status(200).json(usuarios);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los usuarios", error: error.message });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const { name, email, phone, password, state, role } = req.body;

    // Verificar hay un usuario con el mismo email
    const usuarioExistente = await Usuario.findOne({ email: email });
    if (usuarioExistente) {
      return res
        .status(400)
        .json({ message: "Ya existe un usuario con ese correo electrónico." });
    }

    // Crear un nuevo usuario
    const nuevoUsuario = new Usuario({
      name,
      email,
      phone,
      password,
      state,
      role,
    });

    // Guardar el usuario en la base de datos
    await nuevoUsuario.save();

    // Enviar respuesta con el usuario creado
    res
      .status(201)
      .json({ message: "Usuario creado exitosamente", usuario: nuevoUsuario });
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res
      .status(500)
      .json({ message: "Error al crear el usuario", error: error.message });
  }
};
