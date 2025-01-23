import mongoose, { Schema } from "mongoose";

const reservaSchema = new Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  idRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "habitacion",
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
});

const Reserva = mongoose.model("reserva", reservaSchema);

export default Reserva;
