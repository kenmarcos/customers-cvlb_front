"use client";

import { ReactNode, useState } from "react";

import { Button } from "./ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useAuth } from "@/providers/auth";
import { api } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertTriangleIcon } from "lucide-react";

interface CustomerDeleteModalProps {
  children: ReactNode;
  customerId: string;
}

const CustomerDeleteModal = ({
  children,
  customerId,
}: CustomerDeleteModalProps) => {
  const [open, setOpen] = useState(false);

  const { token } = useAuth();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      return await api.delete(`/customers/${customerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      setOpen(false);
    },
    onError: () => {},
  });

  const deleteCustomer = () => {
    mutate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex-row items-center gap-2 ">
          <span className="rounded-full bg-primary-foreground p-[6px]">
            <AlertTriangleIcon size={24} className="text-destructive" />
          </span>
          <DialogTitle>Excluir Cliente</DialogTitle>
        </DialogHeader>
        <div className="space-y-10">
          <div>
            <p>Tem certeza que deseja excluir este cliente?</p>

            <p className="text-sm text-muted-foreground">
              Essa ação não poderá ser desfeita.
            </p>
          </div>

          <div className="space-x-2 text-end">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>

            <Button variant="destructive" onClick={deleteCustomer}>
              Excluir
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDeleteModal;
