"use client";

import CustomerListItem from "./customer-list-item";

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
    <section>
      <ul className="space-y-6">
        {data?.customers.map((customer) => (
          <li key={customer.id}>
            <CustomerListItem customer={customer} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CustomerListSection;
