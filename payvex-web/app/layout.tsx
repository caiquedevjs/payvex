import { AppLoader } from "@/components/layout/app-loader";
import { LoaderProvider } from "@/context/loader-context";
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Fonte moderna para SaaS
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Payvex | Gestão Financeira Centralizada",
  description: "Organize todos os seus pagamentos em um só lugar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen`}>
        {/* Provedor de Notificações Global */}
        <LoaderProvider>
          <AppLoader />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#3A416F",
                color: "#fff",
              },
              success: {
                iconTheme: {
                  primary: "#82d616",
                  secondary: "#fff",
                },
              },
            }}
          />

          {/* Conteúdo da Página */}
          <main>{children}</main>
        </LoaderProvider>
      </body>
    </html>
  );
}
