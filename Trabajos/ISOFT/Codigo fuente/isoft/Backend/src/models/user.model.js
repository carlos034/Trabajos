import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
    trim: true
  },
  email: { 
    type: String,
    required: true,
    trim: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  tipo_usuario: {
    type: String,
    required: true,
    enum: [
      'doctor',
      'paciente',
      'administrador'
    ]
  },
  
}, {
  timestamps: true
});

export default mongoose.model('Usuario', userSchema)
