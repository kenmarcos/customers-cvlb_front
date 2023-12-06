"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/providers/auth";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, { message: "Campo obrigatório." }).email(),
  password: z
    .string()
    .min(1, { message: "Campo obrigatório." })
    .min(6, { message: "Mínimo de 6 caracteres." }),
});

type LoginData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();

  const { setToken } = useAuth();

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (loginData: LoginData) => {
      const response = await api.post("/users/login", loginData);

      return response;
    },
    onSuccess: (res) => {
      toast({
        description: "Login realizado com sucesso!",
      });

      setToken(res.data.token);

      router.push("/dashboard");
    },

    onError: () => {
      toast({
        description: "Ocorreu um erro, por favor tente novamente.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: LoginData) {
    mutate(values);
  }

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Acesse sua conta</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1"
        >
          <CardContent>
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu e-mail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite sua senha"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button size="lg" type="submit" className="w-full sm:w-auto">
              Entrar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default LoginForm;
