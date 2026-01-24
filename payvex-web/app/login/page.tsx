 
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoader } from "@/context/loader-context";
import { api } from "@/lib/api";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const { startLoading } = useLoader();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Chamada para o seu backend NestJS (Rota: /identity/login)
      const response = await api.post("/identity/login", credentials);

      // 2. Persistência do Token e dados básicos
      // O NestJS costuma retornar { accessToken: '...' }
      const { accessToken, user } = response.data;

      localStorage.setItem("@payvex:token", accessToken);
      if (user) {
        localStorage.setItem("@payvex:user", JSON.stringify(user));
      }

      // 3. Feedback de sucesso
      toast.success("Bem-vindo de volta!", {});

      // 4. Inicia a animação de transição e redireciona
      startLoading();
      router.push("/dashboard");
    } catch (error: any) {
      // Tratamento de erro vindo do NestJS (Pipes de validação ou AuthGuard)
      const msg = error.response?.data?.message || "E-mail ou senha inválidos.";

      toast.error("Falha na autenticação", {});

      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* LADO ESQUERDO: Branding (Inalterado) */}
      <div className="hidden lg:flex w-1/2 bg-[#3A416F] p-12 flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-[#82d616] rounded-full blur-[120px] opacity-20"></div>
        <div className="relative z-10">
          <div className="mb-2">
            <Image
              src="/Payvex-Logo.png"
              alt="Payvex Logo"
              width={300}
              height={180}
              priority
              className="object-contain"
            />
          </div>
          <div className="mt-8 space-y-4">
            <h2 className="text-5xl font-extrabold leading-tight">
              Bem-vindo de <br />
              <span className="text-[#82d616]">volta ao cockpit.</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-md">
              Sua infraestrutura de pagamentos está pronta. Acesse e otimize
              suas taxas.
            </p>
          </div>
        </div>

        <div className="relative z-10 space-y-4">
          {/* Card 1: Setup Rápido com Efeito Levitar */}
          <div className="flex items-center gap-3 text-sm text-gray-300 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:text-white group cursor-default p-2 -ml-2 rounded-xl hover:bg-white/5">
            <div className="bg-[#82d616]/10 p-2 rounded-lg group-hover:bg-[#82d616]/20 transition-colors">
              <CheckCircle2 className="text-[#82d616] w-5 h-5" />
            </div>
            <span className="font-medium">
              Dashboard intuitivo com setup em minutos.
            </span>
          </div>

          {/* Card 2: Segurança com Efeito Levitar */}
          <div className="flex items-center gap-3 text-sm text-gray-300 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:text-white group cursor-default p-2 -ml-2 rounded-xl hover:bg-white/5">
            <div className="bg-[#82d616]/10 p-2 rounded-lg group-hover:bg-[#82d616]/20 transition-colors">
              <CheckCircle2 className="text-[#82d616] w-5 h-5" />
            </div>
            <span className="font-medium">
              Transações seguras com criptografia avançada.
            </span>
          </div>
        </div>
      </div>

      {/* LADO DIREITO: Formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-4xl font-bold text-[#3A416F]">Entrar</h3>
            <p className="text-gray-500 text-lg">
              Insira suas credenciais Payvex.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-[#3A416F] font-bold">
                  E-mail Profissional
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="exemplo@payvex.com.br"
                    className="pl-10 h-12 focus-visible:ring-[#82d616] rounded-[0.625rem]"
                    required
                    onChange={(e) =>
                      setCredentials({ ...credentials, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-[#3A416F] font-bold"
                  >
                    Senha
                  </Label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 h-12 focus-visible:ring-[#82d616] rounded-[0.625rem]"
                    required
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-[#3A416F]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-[#3A416F] hover:bg-[#2a2f52] text-white font-bold h-12 text-md transition-all group rounded-[0.625rem] shadow-lg shadow-blue-900/10"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2 italic">
                  {" "}
                  <Loader2 className="animate-spin h-4 w-4" /> Validando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Acessar Dashboard{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-400">
                  Novo por aqui?
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-2 border-gray-100 hover:bg-gray-50 text-[#3A416F] font-bold rounded-[0.625rem]"
              onClick={() => {
                startLoading();
                router.push("/register");
              }}
            >
              Criar conta gratuita
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
