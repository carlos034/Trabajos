import mongoose from "mongoose";
import { number } from "zod";

const citaMedicaSchema = new mongoose.Schema({
  date: {
    type: Date,
    
  },
  motivo: {
    type: String,
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

export default mongoose.model("citaMedica", citaMedicaSchema);
