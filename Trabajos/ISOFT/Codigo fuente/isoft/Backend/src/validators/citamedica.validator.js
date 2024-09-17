import { z } from "zod";

export const createCita = z.object({
  motivo: z
    .string({
      required_error: "motivo debe ser un string",
    }),
  nombreDoctor: z.string({
    required_error: "Doctor es requerido",
  }),
});
