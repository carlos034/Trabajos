import HistorialMedico from "../models/historialmedico.model.js";
import Usuario from "../models/user.model.js"
import multer from "multer";
 
const storage = multer.diskStorage({
    destination: 'ruta/de/almacenamiento',
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const extension = file.originalname.split('.').pop();
      cb(null, `archivo-${uniqueSuffix}.${extension}`);
    },
  });

 // const upload = multer({ storage });
  

 export const GetHistorialesMedicosDoctor = async (req, res) => {
    try {
      const historialesMedicos = await HistorialMedico.find({doctor: req.usuario.id}).populate({
        path: "Paciente",
        select: "usuario",
      })
      .populate({
        path: "doctor",
        select: "usuario",
      });
      
    res.json(historialesMedicos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const GetHistorialesMedicosPaciente = async (req, res) => {
    try {
      const historialesMedicos = await HistorialMedico.find({Paciente: req.usuario.id}).populate({
        path: "Paciente",
        select: "usuario",
      })
      .populate({
        path: "doctor",
        select: "usuario",
      });
      
    res.json(historialesMedicos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getHistorialmedico = async (req, res) => {
    const historialmedico = await HistorialMedico
      .findById(req.params.id)
      .populate({
        path: "Paciente",
        select: "usuario",
      })
      .populate({
        path: "doctor",
        select: "usuario",
      });
    if (!historialmedico)
      return res.Status(400).json({ message: "historial medico no encontrado" });
    res.json(historialmedico);
  };

  export const createHistorialMedico = async (req, res) => {
    const { edadPaciente, generoPaciente, nombrePaciente, tipoSangrePaciente, regimenPaciente,archivo} = req.body; 
   /* try {
      upload.single('archivo')(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error al cargar el archivo' });
        }
*/try{
        const Paciente = await Usuario.findOne({ usuario: nombrePaciente });
        console.log(Paciente.id);
    if (!Paciente) {
      return res
        .status(404)
        .json({ message: "No se encontró al paciente especificado" });
    }
  
        const historialMedico = new HistorialMedico({
          edadPaciente,
          generoPaciente,
          Paciente: Paciente.id,
          tipoSangrePaciente,
          regimenPaciente,
          archivo,
          doctor: req.usuario.id,
        });

        const savedHistorialMedico = await historialMedico.save();
        res.json(savedHistorialMedico);
      }
     catch (error) {
      res.status(500).json({message: error.message});
    }
  };
  
  export const deleteHistorialMedico = async (req, res) => {
    const historialmedico = await HistorialMedico.findByIdAndDelete(req.params.id);
    if (!historialmedico)
      return res.status(404).json({ message: "historial medico no encontrado" });
    res.sendStatus(204);
  };

  export const updateHistorialMedico = async (req, res) => {
    const historialmedico = await HistorialMedico.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!historialmedico)
      return res.sendStatus(404).json({ message: "historial medico no encontrado" });
    res.json(historialmedico);
  };