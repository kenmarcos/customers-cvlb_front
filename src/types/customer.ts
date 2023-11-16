import { Address } from "./address";

import {
  customerRegisterSchema,
  customerUpdateSchema,
} from "@/utils/customer-schemas";
import { z } from "zod";

export interface Customer {
  id: string;
  name: string;
  email: string;
  cpf: string;
  cellphone: string;
  birthdate: string;
  isClubMember: boolean;
  createdAt: string;
  updatedAt: string;
  addresses?: Address[];
}

export interface CustomerList {
  customers: Customer[];
  totalCount: number;
}

export type CustomerRegisterData = z.infer<typeof customerRegisterSchema>;

export type CustomerUpdateData = z.infer<typeof customerUpdateSchema>;
