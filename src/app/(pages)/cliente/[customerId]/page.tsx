"use client";

import { useEffect } from "react";

import CustomerAddresses from "./components/customer-addresses";
import CustomerPersonalDataForm from "./components/customer-personal-data-form";

import Loading from "@/components/loading";
import PageHeader from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/services/api";
import { Customer } from "@/types/customer";
import { useQuery } from "@tanstack/react-query";

interface CustomerDetailsProps {
  params: {
    customerId: string;
  };
}

const CustomerDetails = ({ params }: CustomerDetailsProps) => {
  const { data, isLoading } = useQuery<Customer, Error>({
    queryKey: ["customer", params.customerId],
    queryFn: async () => {
      const response = await api.get(`/customers/${params.customerId}`);

      return response.data;
    },
  });

  useEffect(() => {});

  if (!data || isLoading) {
    return <Loading />;
  }

  const { addresses, ...personalData } = data;

  return (
    <div className="space-y-6">
      <PageHeader title="Detalhes do Cliente" />

      <Tabs defaultValue="personal-data" className="">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2 bg-muted-foreground text-white">
          <TabsTrigger value="personal-data">Dados Pessoais</TabsTrigger>
          <TabsTrigger value="addresses">Endereços</TabsTrigger>
        </TabsList>
        <TabsContent value="personal-data">
          <CustomerPersonalDataForm personalData={personalData} />
        </TabsContent>

        <TabsContent value="addresses">
          <CustomerAddresses addresses={addresses} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerDetails;
