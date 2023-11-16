import { addressRegisterSchema } from "@/utils/address-schema";
import { z } from "zod";

export interface Address {
  id: string;
  zipCode: string;
  state: string;
  city: string;
  district: string;
  street: string;
  number: number;
  complement?: string;
  title?: string;
  createdAt: string;
  updatedAt: string;
}

export type AddressRegisterData = z.infer<typeof addressRegisterSchema>;
