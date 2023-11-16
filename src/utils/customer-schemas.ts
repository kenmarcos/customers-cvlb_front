import { z } from "zod";

export const customerRegisterSchema = z.object({
  name: z.string().min(1, { message: "Campo obrigatório." }),
  email: z.string().min(1, { message: "Campo obrigatório." }).email({
    message: "Digite um email válido.",
  }),
  cpf: z.string().min(1, { message: "Campo obrigatório." }).min(11, {
    message: "Digite um CPF válido.",
  }),
  cellphone: z.string().min(1, { message: "Campo obrigatório." }).min(11, {
    message: "Digite um telefone válido.",
  }),
  birthdate: z.date({
    required_error: "Campo obrigatório.",
  }),
  isClubMember: z.boolean(),
  title: z.string(),
  zipCode: z.string().min(1, { message: "Campo obrigatório." }),
  street: z.string().min(1, { message: "Campo obrigatório." }),
  number: z.string().min(1, { message: "Campo obrigatório." }),
  district: z.string().min(1, { message: "Campo obrigatório." }),
  complement: z.string(),
  city: z.string().min(1, { message: "Campo obrigatório." }),
  state: z.string().min(1, { message: "Campo obrigatório." }),
});

export const customerUpdateSchema = customerRegisterSchema
  .pick({
    name: true,
    cpf: true,
    email: true,
    cellphone: true,
    birthdate: true,
    isClubMember: true,
  })
  .partial();
