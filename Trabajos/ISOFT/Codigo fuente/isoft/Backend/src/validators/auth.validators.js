
import { z } from "zod";
export const registerValidator = z.object({
  usuario: z.string({
    required_error: "Usuario es requerido",
  }),
  email: z
    .string({
      required_error: "Email es requerido",
    })
    .email({
      message: "Email invalido",
    }),
  password: z
    .string({
      required_error: "Contraseña requerida",
    })
    .min(6, {
      message: "La contraseña debe ser de al menos 6 caracteres",
    }),
  tipo_usuario: z.string({
    required_error: "Tipo de usuario es requerido",
  }),
});

export const loginValidator = z.object({
  email: z
    .string({
      required_error: "Email es requerido",
    })
    .email({
      message: "Email invalido",
    }),
  password: z
    .string({
      required_error: "Contraseña requerida",
    })
    .min(6, {
      message: "La contraseña debe ser de al menos 6 caracteres",
    }),
});
