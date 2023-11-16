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
import { api } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertTriangleIcon } from "lucide-react";

interface DeleteModalProps {
  children: ReactNode;
  id: string;
  endpoint: string;
  queryKey: string[];
  title: string;
  description: string;
}

const DeleteModal = ({
  children,
  id,
  endpoint,
  queryKey,
  title,
  description,
}: DeleteModalProps) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      return await api.delete(`/${endpoint}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      setOpen(false);
    },
    onError: () => {},
  });

  const deleteResource = () => {
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
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-10">
          <div>
            <p>{description}</p>

            <p className="text-sm text-muted-foreground">
              Essa ação não poderá ser desfeita.
            </p>
          </div>

          <div className="space-x-2 text-end">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>

            <Button variant="destructive" onClick={deleteResource}>
              Excluir
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
