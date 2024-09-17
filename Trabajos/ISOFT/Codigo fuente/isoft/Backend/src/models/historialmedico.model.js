import mongoose from "mongoose";

const historialMedicoSchema = new mongoose.Schema({
    edadPaciente: {
      type: Number,
      required: true,
    },
    Paciente:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    generoPaciente: {
      type: String,
      required: true,
    },
    tipoSangrePaciente: {
      type: String,
      required: true,
    },
    regimenPaciente: {
      type: String,
      required: true,
    },
    archivo: {
      type: String,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    }
  });
  
  export default mongoose.model('HistorialMedico', historialMedicoSchema);
  