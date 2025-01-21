import mongoose, { Schema } from "mongoose";

const habitacionSchema = new Schema({
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
    enum: [1050, 1550, 3050, 2550, 2050],
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

const Habitacion = mongoose.model("habitacion", habitacionSchema);

export default Habitacion;
