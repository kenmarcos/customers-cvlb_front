import CustomerPersonalDataForm from "./components/customer-personal-data-form";

import PageHeader from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/services/api";
import { Customer } from "@/types/customer";

interface CustomerDetailsProps {
  params: {
    customerId: string;
  };
}

const CustomerDetails = async ({ params }: CustomerDetailsProps) => {
  const response = await api.get<Customer>(`/customers/${params.customerId}`);

  const { addresses, ...personalData } = response.data;

  return (
    <div className="space-y-6">
      <PageHeader title="Detalhes do Cliente" />

      <Tabs defaultValue="personal-data" className="">
        <TabsList className="grid w-[400px] grid-cols-2 bg-muted-foreground text-white">
          <TabsTrigger value="personal-data">Dados Pessoais</TabsTrigger>
          <TabsTrigger value="addresses">Endereços</TabsTrigger>
        </TabsList>
        <TabsContent value="personal-data">
          <CustomerPersonalDataForm personalData={personalData} />
        </TabsContent>

        <TabsContent value="addresses">
          <div>
            <h2 className="text-3xl font-semibold">Endereços</h2>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerDetails;
