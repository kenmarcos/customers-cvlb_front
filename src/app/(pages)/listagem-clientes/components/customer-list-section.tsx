"use client";

import { api } from "@/services/api";
import { CustomerList } from "@/types/customer";
import { useQuery } from "@tanstack/react-query";

const CustomerListSection = () => {
  const { data, isLoading, isError, error } = useQuery<CustomerList, Error>({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await api.get("/customers");

      return response.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      CustomerListSection
      <ul>
        {data?.customers.map((customer) => (
          <li key={customer.id}>{customer.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerListSection;
