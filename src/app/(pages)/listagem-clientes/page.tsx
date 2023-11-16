import React from "react";

import CustomerListSection from "./components/customer-list-section";

import PageHeader from "@/components/page-header";

const CustomerList = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="Listagem de Clientes" />

      <CustomerListSection />
    </div>
  );
};

export default CustomerList;
