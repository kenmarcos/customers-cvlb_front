import CustomerRegisterForm from "./components/customer-register-form";

import PageHeader from "@/components/page-header";

const CustomerRegister = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="Cadastro de Cliente" />

      <CustomerRegisterForm />
    </div>
  );
};

export default CustomerRegister;
