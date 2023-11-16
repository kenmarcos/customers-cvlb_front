import AddressRegisterModal from "./address-register-modal";
import CustomerAddressesItem from "./customer-addresses-item";

import { Button } from "@/components/ui/button";
import { Address } from "@/types/address";
import { PlusIcon } from "lucide-react";

interface CustomerAddressesProps {
  addresses?: Address[];
}

const CustomerAddresses = ({ addresses }: CustomerAddressesProps) => {
  return (
    <div className="space-y-4">
      <div className="text-end">
        <AddressRegisterModal>
          <Button className="gap-1">
            <PlusIcon size={18} />
            Novo Endereço
          </Button>
        </AddressRegisterModal>
      </div>

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {addresses?.map((address) => (
          <li key={address.id}>
            <CustomerAddressesItem address={address} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerAddresses;
