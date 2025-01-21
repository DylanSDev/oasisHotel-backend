import mongoose, { Schema } from "mongoose";

const habitacionSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    min: 1,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["Superior", "Deluxe", "Presidencial", "Ejecutiva", "Junior"],
  },
  price: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > this.startDate;
      },
      message: "La fecha de fin debe ser posterior a la fecha de inicio.",
    },
  },
  image: {
    type: String,
    required: true,
  },
});

const Habitacion = mongoose.model("Habitacion", habitacionSchema);

module.exports = Habitacion;
