import mongoose, { Schema } from "mongoose";

const usuarioSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/],
      maxlength: 35,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{10,}$/], // Acepta 10 o más dígitos
      maxlength: 20,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    state: {
      type: String,
      enum: ["activo", "suspendido"],
      default: "activo",
    },
    role: {
      type: String,
      enum: ["usuario", "admin"],
      default: "usuario",
    },
  },
  { timestamps: true }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
