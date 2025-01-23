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
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > this.checkIn;
      },
      message:
        "La fecha de check-out debe ser posterior a la fecha de check-in.",
    },
  },
});

const Reserva = mongoose.model("reserva", reservaSchema);

export default Reserva;
