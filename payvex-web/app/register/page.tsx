"use client";

import { api } from "@/lib/api";
import {
    ArrowRight,
    Building2,
    CheckCircle2,
    Eye,
    EyeOff,
    FileText,
    Lock,
    Mail,
    User,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    companyName: "",
    companyCnpj: "",
  });

  const maskCNPJ = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .substring(0, 18);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...formData,
      companyCnpj: formData.companyCnpj.replace(/\D/g, ""),
    };

    try {
      await api.post("/identity/signup", payload);
      toast.success("Conta criada com sucesso!");
      router.push("/login");
    } catch (error: any) {
      toast.error("Erro ao criar conta. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* LADO ESQUERDO: Branding & Marketing */}
      <div className="hidden lg:flex w-1/2 bg-[#3A416F] p-12 flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-[#82d616] rounded-full blur-[120px] opacity-20"></div>

        <div className="relative z-10">
          {/* AJUSTE: mb-2 reduz o espaço abaixo da logo */}
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

          {/* AJUSTE: mt-4 reduz o espaço acima do título (era mt-20) */}
          <div className="mt-4 space-y-4">
            <h2 className="text-5xl font-extrabold leading-tight">
              Assuma o controle <br />
              <span className="text-[#82d616]">total do seu caixa.</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-md">
              Centralize Stripe, Mercado Pago e outros gateways em um único
              dashboard inteligente.
            </p>
          </div>
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <CheckCircle2 className="text-[#82d616] w-5 h-5" />
            <span>Setup rápido em menos de 2 minutos.</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <CheckCircle2 className="text-[#82d616] w-5 h-5" />
            <span>Segurança de nível bancário com criptografia de ponta.</span>
          </div>
        </div>
      </div>

      {/* LADO DIREITO: Formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
          {/* Logo para Versão Mobile */}
          <div className="lg:hidden flex justify-center mb-2">
            <Image
              src="/Payvex-Logo.png"
              alt="Payvex Logo"
              width={150}
              height={150}
              className="object-contain"
            />
          </div>

          <div className="space-y-1 text-center lg:text-left">
            <h3 className="text-3xl font-bold text-[#3A416F]">Comece agora</h3>
            <p className="text-gray-500">
              Crie sua conta administrativa no Payvex.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <div className="grid gap-1">
                <Label htmlFor="userName">Seu nome completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="userName"
                    className="pl-10 h-11 focus-visible:ring-[#82d616]"
                    placeholder="Ex: João da Silva"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, userName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid gap-1">
                <Label htmlFor="userEmail">E-mail corporativo</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="userEmail"
                    type="email"
                    className="pl-10 h-11 focus-visible:ring-[#82d616]"
                    placeholder="nome@empresa.com"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, userEmail: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid gap-1">
                <Label htmlFor="userPassword">Sua senha secreta</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="userPassword"
                    type={showPassword ? "text" : "password"}
                    className="pl-10 pr-10 h-11 focus-visible:ring-[#82d616]"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, userPassword: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-100 w-full my-4"></div>

            <div className="space-y-3">
              <div className="grid gap-1">
                <Label htmlFor="companyName">Nome da sua empresa</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="companyName"
                    className="pl-10 h-11 focus-visible:ring-[#82d616]"
                    placeholder="Payvex Tecnologia LTDA"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid gap-1">
                <Label htmlFor="companyCnpj">CNPJ</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="companyCnpj"
                    className="pl-10 h-11 focus-visible:ring-[#82d616]"
                    placeholder="00.000.000/0000-00"
                    required
                    value={formData.companyCnpj}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        companyCnpj: maskCNPJ(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-[#82d616] hover:bg-[#71ba13] text-[#3A416F] font-bold h-12 text-md transition-all group mt-2"
              disabled={loading}
            >
              {loading ? (
                "Processando..."
              ) : (
                <span className="flex items-center gap-2">
                  Finalizar Cadastro{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>

            <p className="text-center text-sm text-gray-500">
              Já tem conta?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-[#3A416F] font-bold hover:underline"
              >
                Faça login
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
