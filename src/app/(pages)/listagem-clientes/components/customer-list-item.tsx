import Link from "next/link";
import React from "react";

import CustomerDeleteModal from "@/components/customer-delete-modal";
import { Button } from "@/components/ui/button";
import { Customer } from "@/types/customer";
import { FilePlus2Icon, Trash2Icon } from "lucide-react";

interface CustomerListItemProps {
  customer: Customer;
}

const CustomerListItem = ({ customer }: CustomerListItemProps) => {
  const { id, name, cpf, email } = customer;

  return (
    <div className="mx-auto max-w-6xl rounded-lg border border-border p-6 shadow-xl duration-500 hover:scale-[1.02]">
      <div className="grid grid-cols-3 items-center sm:grid-cols-4">
        <div className="col-span-2 grid grid-cols-1 space-y-4 sm:col-span-3 sm:grid-cols-3 sm:space-x-4 sm:space-y-0">
          <div className="">
            <p className="text-sm text-muted-foreground">Cliente</p>
            <p className="truncate font-semibold" title={name}>
              {name}
            </p>
          </div>

          <div className="">
            <p className="text-sm text-muted-foreground">CPF</p>
            <p className="truncate font-semibold" title={cpf}>
              {cpf}
            </p>
          </div>

          <div className="">
            <p className="text-sm text-muted-foreground">E-mail</p>
            <p className="truncate font-semibold" title={email}>
              {email}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 justify-self-end lg:grid-cols-2">
          <Button size="sm" asChild>
            <Link href={`/cliente/${id}`}>
              <FilePlus2Icon size={16} />
              <span className="hidden truncate lg:ml-2 lg:inline">
                Detalhes
              </span>
            </Link>
          </Button>

          <CustomerDeleteModal customerId={id}>
            <Button size="sm">
              <Trash2Icon size={16} />
              <span className="hidden truncate lg:ml-2 lg:inline">Excluir</span>
            </Button>
          </CustomerDeleteModal>
        </div>
      </div>
    </div>
  );
};

export default CustomerListItem;
