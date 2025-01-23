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
    const { name, email, phone, password } = req.body;

    const usuarioExistente = await Usuario.findOne({ email: email });
    if (usuarioExistente) {
      return res
        .status(400)
        .json({ message: "Ya existe un usuario con ese correo electrónico." });
    }

    const nuevoUsuario = new Usuario({
      name,
      email,
      phone,
      password,
    });

    await nuevoUsuario.save();

    res
      .status(201)
      .json({ message: "Usuario creado exitosamente", usuario: nuevoUsuario });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el usuario", error: error.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await Usuario.deleteOne({ _id: id });

    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el usuario", error: error.message });
  }
};

export const suspenderUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    usuario.state = "suspendido";

    await usuario.save();

    res
      .status(200)
      .json({ message: "Usuario suspendido exitosamente", usuario });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al suspender el usuario", error: error.message });
  }
};

export const editarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (name) usuario.name = name;
    if (email) usuario.email = email;
    if (phone) usuario.phone = phone;

    await usuario.save();

    res
      .status(200)
      .json({ message: "Usuario actualizado exitosamente", usuario });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al editar el usuario", error: error.message });
  }
};
