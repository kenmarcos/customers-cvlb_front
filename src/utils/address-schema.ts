import { z } from "zod";

export const addressRegisterSchema = z.object({
  title: z.string(),
  zipCode: z.string().min(1, { message: "Campo obrigatório." }),
  street: z.string().min(1, { message: "Campo obrigatório." }),
  number: z.string().min(1, { message: "Campo obrigatório." }),
  district: z.string().min(1, { message: "Campo obrigatório." }),
  complement: z.string(),
  city: z.string().min(1, { message: "Campo obrigatório." }),
  state: z.string().min(1, { message: "Campo obrigatório." }),
  customerId: z.string(),
});
