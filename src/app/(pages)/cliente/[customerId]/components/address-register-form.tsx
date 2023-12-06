"use client";

import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth";
import { api } from "@/services/api";
import { AddressRegisterData } from "@/types/address";
import { addressRegisterSchema } from "@/utils/address-schema";
import { states } from "@/utils/state-options";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";

interface AddressRegisterFormProps {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddressRegisterForm = ({ setOpen }: AddressRegisterFormProps) => {
  const pathname = usePathname();

  const { toast } = useToast();

  const { token } = useAuth();

  const queryClient = useQueryClient();

  const form = useForm<AddressRegisterData>({
    resolver: zodResolver(addressRegisterSchema),
    defaultValues: {
      zipCode: "",
      street: "",
      number: "",
      district: "",
      complement: "",
      city: "",
      state: "",
      title: "",
      customerId: pathname?.split("/")[2],
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (newAddress: AddressRegisterData) => {
      return await api.post("/address", newAddress, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast({
        description: "Endereço cadastrado com sucesso!",
      });

      queryClient.invalidateQueries({ queryKey: ["customer"] });

      if (setOpen) {
        setOpen(false);
      }
    },
    onError: () => {
      toast({
        description: "Ocorreu um erro, por favor tente novamente.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: AddressRegisterData) {
    mutate(values);
  }

  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1"
        >
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input placeholder="99999-999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da Rua" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input placeholder="nº" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do Bairro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="complement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complemento (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Casa, apto, bloco, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Cidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            "font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <SelectValue placeholder="Selecione um estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Casa, Trabalho, etc..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-14 text-center lg:col-span-2">
            <Button
              type="submit"
              className="w-full max-w-md"
              disabled={isPending}
            >
              Finalizar Cadastro
              {isPending && (
                <Loader2Icon className="ml-2 h-5 w-5 animate-spin" />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default AddressRegisterForm;
