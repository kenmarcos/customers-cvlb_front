"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { toast } from "./ui/use-toast";

import { useAuth } from "@/providers/auth";
import { deleteCookie } from "cookies-next";
import {
  LayoutDashboardIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
  UserPlusIcon,
} from "lucide-react";

const Header = () => {
  const { token, setToken } = useAuth();
  const router = useRouter();

  const logout = () => {
    deleteCookie("@cvlb_customers:token");

    setToken("");

    router.push("/");

    toast({
      description: "Logout realizado com sucesso!",
    });
  };

  return (
    <header className="h-20 bg-gradient-cvlb">
      <div className="container flex h-full items-center justify-end">
        <div className="absolute left-4 flex h-24 w-36 items-center bg-background shadow-xl sm:left-1/2 sm:w-60 sm:-translate-x-1/2">
          <Link href="/" className="w-full">
            <Image
              src="/cvlb-logo.svg"
              alt="Imagem do logo CVLB"
              width={0}
              height={0}
              sizes="100vw"
              className="h-16 w-full object-contain px-2 sm:px-0"
              quality={100}
              priority
            />
          </Link>
        </div>

        {!!token && (
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-start">Menu</SheetTitle>
              </SheetHeader>

              <div className="space-y-4 py-4">
                <SheetClose asChild>
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-start gap-2 hover:bg-muted-foreground hover:text-white"
                  >
                    <Link href="/dashboard">
                      <LayoutDashboardIcon size={16} /> Dashboard
                    </Link>
                  </Button>
                </SheetClose>

                <SheetClose asChild>
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-start gap-2 hover:bg-muted-foreground hover:text-white"
                  >
                    <Link href="/cadastro-cliente">
                      <UserPlusIcon size={16} /> Cadastrar Cliente
                    </Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-start gap-2 hover:bg-muted-foreground hover:text-white"
                  >
                    <Link href="/listagem-clientes">
                      <ScrollTextIcon size={16} /> Lista de Clientes
                    </Link>
                  </Button>
                </SheetClose>

                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 hover:bg-muted-foreground hover:text-white"
                    onClick={logout}
                  >
                    <LogOutIcon size={16} /> Sair
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  );
};

export default Header;
