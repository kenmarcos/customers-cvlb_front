"use client";

import { useRouter } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { api } from "@/services/api";
import { states } from "@/utils/stateOptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Loader2Icon } from "lucide-react";
import { z } from "zod";

const customerRegisterSchema = z.object({
  name: z.string().min(1, { message: "Campo obrigatório." }),
  email: z.string().min(1, { message: "Campo obrigatório." }).email({
    message: "Digite um email válido.",
  }),
  cpf: z.string().min(1, { message: "Campo obrigatório." }).min(11, {
    message: "Digite um CPF válido.",
  }),
  cellphone: z.string().min(1, { message: "Campo obrigatório." }).min(11, {
    message: "Digite um telefone válido.",
  }),
  birthdate: z.date({
    required_error: "Campo obrigatório.",
  }),
  isClubMember: z.boolean(),
  title: z.string(),
  zipCode: z.string().min(1, { message: "Campo obrigatório." }),
  street: z.string().min(1, { message: "Campo obrigatório." }),
  number: z.string().min(1, { message: "Campo obrigatório." }),
  district: z.string().min(1, { message: "Campo obrigatório." }),
  complement: z.string(),
  city: z.string().min(1, { message: "Campo obrigatório." }),
  state: z.string().min(1, { message: "Campo obrigatório." }),
});

type CustomerRegisterData = z.infer<typeof customerRegisterSchema>;

const CustomerRegisterForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<CustomerRegisterData>({
    resolver: zodResolver(customerRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      cpf: "",
      cellphone: "",
      isClubMember: false,
      zipCode: "",
      street: "",
      number: "",
      district: "",
      complement: "",
      city: "",
      state: "",
      title: "",
    },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (newCustomer: CustomerRegisterData) => {
      const response = await api.post("/customers", newCustomer);

      return response;
    },
    onSuccess: (response) => {
      toast({
        description: "Cliente cadastrado com sucesso!",
      });

      router.push(`/cliente/${response.data.id}`);
    },
    onError: () => {
      toast({
        description: "Ocorreu um erro, por favor tente novamente.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: CustomerRegisterData) {
    console.log(values);

    mutate(values);
  }

  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-2"
        >
          <div className="space-y-8 pb-10 lg:pb-0 lg:pr-6">
            <h2 className="text-3xl font-semibold">Dados Pessoais</h2>

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
                    <FormDescription>
                      Ativar clube de vantagens.
                    </FormDescription>
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

          <div className="space-y-8 border-t border-border pt-10 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <h2 className="text-3xl font-semibold">Endereço</h2>

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

export default CustomerRegisterForm;
