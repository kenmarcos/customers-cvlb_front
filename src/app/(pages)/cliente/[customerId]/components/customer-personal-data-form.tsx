"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth";
import { api } from "@/services/api";
import { Customer, CustomerUpdateData } from "@/types/customer";
import { customerUpdateSchema } from "@/utils/customer-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Loader2Icon } from "lucide-react";

interface CustomerPersonalDataFormProps {
  personalData: Customer;
}

const CustomerPersonalDataForm = ({
  personalData,
}: CustomerPersonalDataFormProps) => {
  const { id, name, email, cpf, cellphone, birthdate, isClubMember } =
    personalData;

  const { token } = useAuth();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (newCustomer: CustomerUpdateData) => {
      await api.patch(`/customers/${id}`, newCustomer),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
    },
    onSuccess: () => {
      toast({
        description: "Alterações realizadas com sucesso!",
      });
    },
    onError: () => {
      toast({
        description: "Ocorreu um erro, por favor tente novamente.",
        variant: "destructive",
      });
    },
  });

  const form = useForm<CustomerUpdateData>({
    resolver: zodResolver(customerUpdateSchema),
    defaultValues: {
      name,
      email,
      cpf,
      cellphone,
      birthdate: parse(birthdate, "yyyy-MM-dd", new Date()),
      isClubMember,
    },
  });

  function onSubmit(values: CustomerUpdateData) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-8 pb-10 lg:pb-0 lg:pr-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome do cliente" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o e-mail do cliente"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input placeholder="999.999.999-99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="cellphone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input placeholder="(99) 99999-9999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Data de Nascimento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "flex w-full justify-between pl-3 text-left font-normal hover:bg-transparent",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "P", { locale: ptBR })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                          <CalendarIcon className="ml-auto inline h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="isClubMember"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="bg-gradient-cvlb bg-clip-text text-xl font-bold text-transparent">
                    CVLB Top
                  </FormLabel>
                  <FormDescription>Ativar clube de vantagens.</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="mt-14 text-center lg:col-span-2">
          <Button
            type="submit"
            className="w-full max-w-md"
            // disabled={isPending}
          >
            Salvar alterações
            {/* {isPending && (
                <Loader2Icon className="ml-2 h-5 w-5 animate-spin" />
              )} */}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CustomerPersonalDataForm;
