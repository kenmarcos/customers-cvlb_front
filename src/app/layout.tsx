import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CVLB | Base de Clientes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <div className="flex min-h-full flex-col">
          <Header />
          <main className="flex flex-1 items-center">
            <div className="container px-3 pb-8 pt-12">{children}</div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
