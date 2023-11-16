"use client";

import { useState } from "react";

import CustomerListItem from "./customer-list-item";

import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
import { CustomerList } from "@/types/customer";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const CustomerListSection = () => {
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const { data, isLoading, isError, error } = useQuery<CustomerList, Error>({
    queryKey: ["customers", page],
    queryFn: async () => {
      const response = await api.get(`/customers?page=${page}`);

      return response.data;
    },
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  const handlePrevPage = () => {
    setPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((currentPage) => currentPage + 1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <section className="space-y-4">
      <ul className="space-y-6">
        {data?.customers.map((customer) => (
          <li key={customer.id}>
            <CustomerListItem customer={customer} />
          </li>
        ))}
      </ul>

      <div className="mx-auto flex max-w-6xl items-center justify-end gap-6">
        <Button size="icon" onClick={handlePrevPage} disabled={page === 1}>
          <ChevronLeftIcon size={18} />
        </Button>

        <p>{page}</p>

        <Button
          size="icon"
          onClick={handleNextPage}
          disabled={page === Math.ceil(data?.totalCount! / PER_PAGE)}
        >
          <ChevronRightIcon size={18} />
        </Button>
      </div>
    </section>
  );
};

export default CustomerListSection;
