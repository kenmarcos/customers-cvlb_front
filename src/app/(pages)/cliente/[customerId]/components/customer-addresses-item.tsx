import DeleteModal from "@/components/delete-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Address } from "@/types/address";
import { Trash2Icon } from "lucide-react";

interface CustomerAddressesItem {
  address: Address;
}

const CustomerAddressesItem = ({ address }: CustomerAddressesItem) => {
  const { title, zipCode, street, number, district, city, state, complement } =
    address;

  const addressInfo = `${street}, ${number} ${
    complement ? `, ${complement}` : ""
  } — ${zipCode} — ${district}, ${city}, ${state}`;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="truncate">{title || street}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-8">
          <p>{addressInfo}</p>

          <div>
            <DeleteModal
              id={address.id}
              endpoint="address"
              queryKey={["customer"]}
              title="Excluir Endereço"
              description="Tem certeza que deseja excluir este endereço?"
            >
              <Button size="icon" variant="destructive">
                <Trash2Icon size={16} />
              </Button>
            </DeleteModal>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerAddressesItem;
