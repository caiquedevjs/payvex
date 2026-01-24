"use client";

import { cn } from "@/lib/utils";
import {
  Blocks,
  BookOpen,
  ChevronRight,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  UserCircle,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Importações do Dropdown do Shadcn
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Extratos", icon: Wallet, href: "/transactions" },
  { label: "Integrações", icon: Blocks, href: "/integrations" },
  { label: "Assinaturas", icon: CreditCard, href: "/subscriptions" },
  { label: "Documentações", icon: BookOpen, href: "/docs" },
  { label: "Conta", icon: UserCircle, href: "/account" },
];

export function SidebarNav() {
  const pathname = usePathname();
  const router = useRouter();

  // Estado para armazenar o usuário logado
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    // Busca os dados do localStorage salvos no login
    const savedUser = localStorage.getItem("@payvex:user");
    if (savedUser) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUserData(JSON.parse(savedUser));
      } catch (e) {
        console.error("Erro ao carregar dados do usuário");
      }
    }
  }, []);

  // Função de Logout
  const handleLogout = () => {
    localStorage.removeItem("@payvex:token");
    localStorage.removeItem("@payvex:user");
    router.push("/login");
  };

  // Pega as iniciais do nome (ex: Caio Menezes -> CM)
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-[#3a416f] text-slate-300 border-r border-white/10 px-4 py-8 shadow-2xl">
      {/* LOGO PAYVEX */}
      <div className="flex items-center gap-3 px-2 mb-12 group cursor-default">
        <div className="h-10 w-10 bg-[#82d616] rounded-[0.625rem] flex items-center justify-center text-[#3a416f] font-black shadow-lg shadow-[#82d616]/20 transition-transform group-hover:rotate-3">
          P
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-white leading-none tracking-tight">
            Payvex
          </span>
          <span className="text-[10px] text-[#82d616] font-bold uppercase tracking-widest mt-1.5">
            Hub Business
          </span>
        </div>
      </div>

      {/* NAVEGAÇÃO PRINCIPAL */}
      <nav className="flex-1 space-y-2">
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] px-3 mb-4">
          Gerenciamento
        </p>

        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{ borderRadius: "0.625rem" }}
              className={cn(
                "group flex items-center justify-between px-3 py-3 text-sm font-medium transition-all duration-300",
                isActive
                  ? "bg-white/10 text-[#82d616] shadow-inner"
                  : "hover:bg-white/5 hover:text-white",
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isActive
                      ? "text-[#82d616]"
                      : "text-white/50 group-hover:text-[#82d616]",
                  )}
                />
                <span
                  className={
                    isActive
                      ? "font-bold text-white"
                      : "group-hover:translate-x-1 transition-transform"
                  }
                >
                  {item.label}
                </span>
              </div>

              <div className="flex items-center justify-center w-5">
                {isActive ? (
                  <div className="h-1.5 w-1.5 rounded-full bg-[#82d616] shadow-[0_0_12px_#82d616]" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-[#82d616] opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* FOOTER - PERFIL COM DROPDOWN */}
      <div className="mt-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              style={{ borderRadius: "0.625rem" }}
              className="bg-white/5 p-4 border border-white/10 flex items-center gap-3 hover:bg-white/10 transition-all cursor-pointer group outline-none"
            >
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-[#3a416f] border-2 border-[#82d616] flex items-center justify-center text-xs font-bold text-white">
                  {userData ? getInitials(userData.name) : "PX"}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-[#82d616] border-2 border-[#3a416f] rounded-full" />
              </div>

              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-bold text-white truncate group-hover:text-[#82d616] transition-colors">
                  {userData?.name || "Carregando..."}
                </span>
                <span className="text-[10px] text-white/50 uppercase font-medium">
                  Sócio Administrador
                </span>
              </div>
            </div>
          </DropdownMenuTrigger>

          {/* CONTEÚDO DO DROPDOWN (Paleta Payvex) */}
          <DropdownMenuContent
            className="w-56 mb-2 bg-[#3a416f] border-white/10 text-white rounded-[0.625rem] shadow-2xl"
            align="end"
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-bold leading-none text-white">
                  {userData?.name}
                </p>
                <p className="text-xs leading-none text-white/50">
                  {userData?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="focus:bg-white/10 focus:text-[#82d616] cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Meu Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-white/10 focus:text-[#82d616] cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="focus:bg-red-500/20 text-red-400 focus:text-red-400 cursor-pointer font-bold"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair da Payvex</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
