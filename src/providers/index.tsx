import { ReactNode } from "react";

import { AuthProvider } from "./auth";

interface ContextProvidersProps {
  children: ReactNode;
}

const ContextProviders = ({ children }: ContextProvidersProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default ContextProviders;
