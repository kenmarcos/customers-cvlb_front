"use client";

import { ReactNode, useState } from "react";

import AddressRegisterForm from "./address-register-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PenSquareIcon } from "lucide-react";

interface AddressRegisterModalProps {
  children: ReactNode;
}

const AddressRegisterModal = ({ children }: AddressRegisterModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-96 max-h-[90vh] overflow-y-scroll">
        <DialogHeader className="flex-row items-center gap-2 ">
          <span className="rounded-full bg-muted-foreground p-[6px]">
            <PenSquareIcon size={24} color="white" />
          </span>
          <DialogTitle>Cadastrar Endereço</DialogTitle>
        </DialogHeader>
        <div>
          <AddressRegisterForm setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddressRegisterModal;
