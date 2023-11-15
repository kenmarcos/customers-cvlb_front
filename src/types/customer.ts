import { Address } from "./address";

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
